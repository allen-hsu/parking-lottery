import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ParkingSpace,
  LotteryFormData,
  LotteryRules,
  Resident,
} from "@/types/ParkingSpace";

const formSchema = z.object({
  participants: z.number().min(1, "至少需要1名參與者"),
  rules: z.object({
    noRestriction: z.boolean(),
    onlyStore: z.boolean(),
    onlyDisabled: z.boolean(),
    onlyMotorcycle: z.boolean(),
    largePriority: z.boolean(),
    excludeStore: z.boolean(),
    excludeDisabled: z.boolean(),
    excludeMotorcycle: z.boolean(),
    areaRestriction: z.boolean(),
  }),
});

interface LotteryFormProps {
  onSubmit: (data: LotteryFormData) => void;
  availableSpaces: ParkingSpace[];
  availableResidents: Resident[];
}

const LotteryForm: React.FC<LotteryFormProps> = ({
  onSubmit,
  availableSpaces,
  availableResidents,
}) => {
  const form = useForm<LotteryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participants: 0,
      rules: {
        noRestriction: true,
        onlyStore: false,
        onlyDisabled: false,
        onlyMotorcycle: false,
        largePriority: false,
        excludeStore: false,
        excludeDisabled: false,
        excludeMotorcycle: false,
        areaRestriction: false,
      },
    },
  });

  // 計算各區域的住戶數量
  const residentCounts = availableResidents.reduce(
    (acc, resident) => {
      acc[resident.area]++;
      acc.total++;
      return acc;
    },
    { S: 0, A: 0, B: 0, C: 0, total: 0 }
  );

  const handleRulesChange = (
    field: any,
    value: boolean,
    ruleName: keyof LotteryRules
  ) => {
    let newRules = { ...field.value, [ruleName]: value };

    if (ruleName === "noRestriction" && value) {
      // 如果選擇了"無限制規則",取消其他所有選項
      newRules = {
        noRestriction: true,
        onlyStore: false,
        onlyDisabled: false,
        onlyMotorcycle: false,
        largePriority: false,
        excludeStore: false,
        excludeDisabled: false,
        excludeMotorcycle: false,
        areaRestriction: false,
      };
    } else if (ruleName !== "largePriority" && ruleName !== "areaRestriction") {
      // 如果選擇了其他規則(除了大車位優先和分區抽選),取消"無限制規則"
      newRules.noRestriction = false;
    }

    field.onChange(newRules);
  };

  const getAvailableSpacesCount = (rules: LotteryRules) => {
    return availableSpaces.filter((space) => {
      if (rules.noRestriction) return true;
      if (rules.onlyStore) return space.allocation === "店";
      if (rules.onlyDisabled) return space.size === "身障";
      if (rules.onlyMotorcycle) return space.allocation === "重";
      if (rules.excludeStore && space.allocation === "店") return false;
      if (rules.excludeDisabled && space.size === "身障") return false;
      if (rules.excludeMotorcycle && space.allocation === "重") return false;
      return true;
    }).length;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>參與人數</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                  className="bg-white"
                />
              </FormControl>
              <FormDescription>
                請輸入本輪參與抽籤的人數
                <div className="mt-2">
                  <p>總可用住戶數量: {residentCounts.total}</p>
                  <p>S區住戶數量: {residentCounts.S}</p>
                  <p>A區住戶數量: {residentCounts.A}</p>
                  <p>B區住戶數量: {residentCounts.B}</p>
                  <p>C區住戶數量: {residentCounts.C}</p>
                </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>抽籤規則</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {Object.entries(field.value).map(([key, checked]) => (
                    <div key={key} className="flex items-center">
                      <Checkbox
                        id={key}
                        checked={checked}
                        onCheckedChange={(value) =>
                          handleRulesChange(
                            field,
                            value as boolean,
                            key as keyof LotteryRules
                          )
                        }
                      />
                      <label
                        htmlFor={key}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {key === "noRestriction" && "無限制規則"}
                        {key === "onlyStore" && "只抽店面"}
                        {key === "onlyDisabled" && "只抽身障"}
                        {key === "onlyMotorcycle" && "只抽重機"}
                        {key === "largePriority" && "大車位優先"}
                        {key === "excludeStore" && "過濾店面"}
                        {key === "excludeDisabled" && "過濾身障"}
                        {key === "excludeMotorcycle" && "過濾大型重機"}
                        {key === "areaRestriction" && "分區抽選"}
                      </label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormDescription>
                可用車位數量: {getAvailableSpacesCount(field.value)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          開始抽籤
        </Button>
      </form>
    </Form>
  );
};

export default LotteryForm;
