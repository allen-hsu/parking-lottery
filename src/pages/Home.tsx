import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LotteryForm from "../components/LotteryForm";
import LotteryResults from "../components/LotteryResults";
import ParkingSpaceList from "../components/ParkingSpaceList";
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

  useEffect(() => {
    setError(null);
  }, [availableSpaces]);

  const handleLotterySubmit = (formData: LotteryFormData) => {
    const { participants, rules } = formData;
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

    if (participants > eligibleSpaces.length) {
      setError(
        `參與人數(${participants})超過可用車位數量(${eligibleSpaces.length})，請減少參與人數或更改抽籤規則。`
      );
      return;
    }

    if (participants > availableResidents.length) {
      setError(
        `參與人數(${participants})超過可用住戶數量(${availableResidents.length})，請減少參與人數。`
      );
      return;
    }

    const shuffledResidents = [...availableResidents].sort(
      () => Math.random() - 0.5
    );

    const unassignedResidents: Resident[] = [];

    for (let i = 0; i < participants; i++) {
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
        (resident) =>
          !winners.some((winner) => winner.resident.id === resident.id)
      )
    );
  };

  const handleReset = () => {
    setLotteryResults([]);
    setAvailableSpaces(
      initialParkingSpaces.map((space) => ({ ...space, isAvailable: true }))
    );
    setAvailableResidents(residents);
    setError(null);
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => resultsRef.current,
    documentTitle: "抽籤結果",
  });

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4 max-w-7xl h-full">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
            車位抽籤系統
          </h1>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>錯誤</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
            <div className="w-full lg:w-1/3">
              <Card className="shadow-lg h-full">
                <CardHeader className="bg-blue-500 text-white">
                  <CardTitle className="text-2xl font-bold">抽籤表單</CardTitle>
                </CardHeader>
                <CardContent className="p-6 overflow-y-auto h-[calc(100%-80px)]">
                  <LotteryForm
                    onSubmit={handleLotterySubmit}
                    availableSpaces={availableSpaces}
                    availableResidents={availableResidents}
                  />
                  <div className="flex flex-col gap-2 mt-4">
                    <Button onClick={handleReset} className="w-full">
                      重置抽籤
                    </Button>
                    <ParkingSpaceList spaces={initialParkingSpaces} />
                    <ResidentList residents={residents} />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full lg:w-2/3">
              <Card className="shadow-lg h-full">
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
                <CardContent className="p-6 overflow-y-auto h-[calc(100%-80px)]">
                  <div ref={resultsRef}>
                    <LotteryResults results={lotteryResults} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
