import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LotteryForm from "../components/LotteryForm";
import LotteryResults from "../components/LotteryResults";
import ParkingSpaceList from "../components/ParkingSpaceList";
import ParkingLayout from "../components/ParkingLayout";
import ResidentList from "../components/ResidentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ParkingSpace,
  initialParkingSpaces,
  residents,
  Resident,
  LotteryFormData,
} from "@/types/ParkingSpace";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download } from "lucide-react";

interface LotteryResult {
  round: number;
  winners: Array<{
    resident: Resident;
    space: ParkingSpace;
  }>;
}

const Home: React.FC = () => {
  const [lotteryResults, setLotteryResults] = useState<LotteryResult[]>([]);
  const [availableSpaces, setAvailableSpaces] =
    useState<ParkingSpace[]>(initialParkingSpaces);
  const [availableResidents, setAvailableResidents] =
    useState<Resident[]>(residents);
  const [error, setError] = useState<string | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    setError(null);
  }, [availableSpaces]);

  const handleLotterySubmit = (formData: LotteryFormData) => {
    const { selectedResidents, rules } = formData;
    const winners: Array<{ resident: Resident; space: ParkingSpace }> = [];

    let eligibleSpaces = availableSpaces.filter((space) => {
      if (rules.noRestriction) return true;
      if (rules.onlyStore) return space.allocation === "店";
      if (rules.onlyDisabled) return space.size === "身障";
      if (rules.onlyMotorcycle) return space.allocation === "重";
      if (rules.excludeStore && space.allocation === "店") return false;
      if (rules.excludeDisabled && space.size === "身障") return false;
      if (rules.excludeMotorcycle && space.allocation === "重") return false;
      return true;
    });

    if (selectedResidents.length > eligibleSpaces.length) {
      setError(
        `選擇的住戶數量(${selectedResidents.length})超過可用車位數量(${eligibleSpaces.length})，請減少選擇的住戶數量或更改抽籤規則。`
      );
      return;
    }

    const participatingResidents = availableResidents.filter((resident) =>
      selectedResidents.includes(resident.id)
    );

    const shuffledResidents = [...participatingResidents].sort(
      () => Math.random() - 0.5
    );

    const unassignedResidents: Resident[] = [];

    for (let i = 0; i < shuffledResidents.length; i++) {
      const resident = shuffledResidents[i];
      let eligibleSpacesForResident = eligibleSpaces;

      if (rules.areaRestriction) {
        // 實現分區抽選邏輯
        if (resident.area === "S") {
          eligibleSpacesForResident = eligibleSpaces.filter(
            (space) => space.allocation === "店"
          );
        } else {
          eligibleSpacesForResident = eligibleSpaces.filter(
            (space) => space.allocation === resident.area
          );
        }
      }

      if (rules.largePriority) {
        // 實現大車位優先邏輯
        const largeSpaces = eligibleSpacesForResident.filter(
          (space) => space.size === "大"
        );
        if (largeSpaces.length > 0) {
          eligibleSpacesForResident = largeSpaces;
        }
      }

      if (eligibleSpacesForResident.length === 0) {
        unassignedResidents.push(resident);
        continue;
      }

      const randomIndex = Math.floor(
        Math.random() * eligibleSpacesForResident.length
      );
      const space = eligibleSpacesForResident[randomIndex];

      winners.push({ resident, space });
      space.isAvailable = false;
      eligibleSpaces = eligibleSpaces.filter((s) => s.number !== space.number);
    }

    // 隨機分配剩餘車位給未分配的住戶
    for (const resident of unassignedResidents) {
      if (eligibleSpaces.length === 0) {
        setError(`無法為所有住戶分配車位，請調整抽籤規則或減少參與人數。`);
        return;
      }

      const randomIndex = Math.floor(Math.random() * eligibleSpaces.length);
      const space = eligibleSpaces[randomIndex];

      winners.push({ resident, space });
      space.isAvailable = false;
      eligibleSpaces = eligibleSpaces.filter((s) => s.number !== space.number);
    }

    const newResult: LotteryResult = {
      round: lotteryResults.length + 1,
      winners,
    };

    setLotteryResults([...lotteryResults, newResult]);
    setAvailableSpaces(availableSpaces.filter((space) => space.isAvailable));
    setAvailableResidents(
      availableResidents.filter(
        (resident) => !selectedResidents.includes(resident.id)
      )
    );
    setResetTrigger((prev) => prev + 1); // 在抽籤完成後觸發重置
  };

  const handleReset = () => {
    setLotteryResults([]);
    setAvailableSpaces(
      initialParkingSpaces.map((space) => ({ ...space, isAvailable: true }))
    );
    setAvailableResidents(residents);
    setError(null);
    setResetTrigger((prev) => prev + 1); // 在重置時也觸發重置
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => resultsRef.current,
    documentTitle: "抽籤結果",
  });

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
            車位抽籤系統
          </h1>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>錯誤</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 shadow-lg">
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="text-2xl font-bold">抽籤表單</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <LotteryForm
                  onSubmit={handleLotterySubmit}
                  availableSpaces={availableSpaces}
                  availableResidents={availableResidents}
                  resetTrigger={resetTrigger} // 將 resetTrigger 傳遞給 LotteryForm
                />
                <Button onClick={handleReset} className="w-full">
                  重置抽籤
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <ParkingSpaceList spaces={initialParkingSpaces} />
                  <ParkingLayout />
                  <ResidentList residents={residents} />
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2 shadow-lg">
              <CardHeader className="bg-blue-500 text-white flex justify-between items-center">
                <CardTitle className="text-2xl font-bold">抽籤結果</CardTitle>
                <Button
                  onClick={handlePrint}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-blue-600"
                  disabled={lotteryResults.length === 0}
                >
                  <Download className="h-6 w-6" />
                </Button>
              </CardHeader>
              <CardContent className="p-6 h-[calc(100vh-250px)] overflow-y-auto">
                <div ref={resultsRef}>
                  <LotteryResults results={lotteryResults} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
