import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  ParkingSpace,
  LotteryFormData,
  LotteryRules,
  Resident,
} from "@/types/ParkingSpace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  selectedResidents: z.array(z.string()).min(1, "請至少選擇一位住戶"),
  bulkInput: z.string(),
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
  resetTrigger: number;
}

const LotteryForm: React.FC<LotteryFormProps> = ({
  onSubmit,
  availableSpaces,
  availableResidents,
  resetTrigger,
}) => {
  const [selectedResidents, setSelectedResidents] = useState<string[]>([]);
  const form = useForm<LotteryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedResidents: [],
      bulkInput: "",
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

  useEffect(() => {
    setSelectedResidents([]);
    form.reset({
      selectedResidents: [],
      bulkInput: "",
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
    });
  }, [resetTrigger, form]);

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

  const handleResidentSelect = (residentId: string) => {
    console.log("residentId", residentId);

    setSelectedResidents((prev) => {
      const newSelectedResidents = prev.includes(residentId)
        ? prev.filter((id) => id !== residentId)
        : [...prev, residentId];

      // 更新表单的 selectedResidents 字段
      form.setValue("selectedResidents", newSelectedResidents);

      return newSelectedResidents;
    });
  };

  const handleBulkInput = () => {
    const bulkInput = form.getValues("bulkInput");
    const inputIds = bulkInput.split(/[\s,]+/).filter(Boolean);
    const validIds = inputIds.filter((id) =>
      availableResidents.some((resident) => resident.id === id)
    );
    setSelectedResidents(validIds);
    form.setValue("selectedResidents", validIds);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="bulkInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>批量輸入住戶ID</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="請輸入住戶ID，用空格或逗號分隔"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                輸入多個住戶ID，用空格或逗號分隔
              </FormDescription>
              <Button type="button" onClick={handleBulkInput}>
                批量添加
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="selectedResidents"
          render={() => (
            <FormItem>
              <FormLabel>選擇參與抽籤的住戶</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => handleResidentSelect(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇住戶" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableResidents.map((resident) => (
                      <SelectItem key={resident.id} value={resident.id}>
                        {resident.unitNumber} ({resident.area}區)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <div className="mt-2 space-y-2">
                {selectedResidents.map((residentId) => {
                  const resident = availableResidents.find(
                    (r) => r.id === residentId
                  );
                  return (
                    <div
                      key={residentId}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked
                        onCheckedChange={() => handleResidentSelect(residentId)}
                      />
                      <span>
                        {resident?.unitNumber} ({resident?.area}區)
                      </span>
                    </div>
                  );
                })}
              </div>
              <FormDescription>
                已選擇 {selectedResidents.length} 位住戶
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
