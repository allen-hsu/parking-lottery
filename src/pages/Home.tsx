import React, { useState, useEffect } from "react";
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

    const eligibleSpaces = availableSpaces.filter((space) => {
      if (rules.noRestriction) return true;
      if (rules.onlyStore) return space.allocation === "店";
      if (rules.onlyDisabled) return space.size === "身障";
      if (rules.onlyMotorcycle) return space.allocation === "重";
      if (rules.largePriority) return space.size === "大";
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

    const shuffledSpaces = [...eligibleSpaces].sort(() => Math.random() - 0.5);
    const shuffledResidents = [...availableResidents].sort(
      () => Math.random() - 0.5
    );

    for (let i = 0; i < participants; i++) {
      const space = shuffledSpaces[i];
      const resident = shuffledResidents[i];
      winners.push({
        resident,
        space,
      });
      space.isAvailable = false;
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
                    <ParkingLayout />
                    <ResidentList residents={residents} />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full lg:w-2/3">
              <Card className="shadow-lg h-full">
                <CardHeader className="bg-blue-500 text-white">
                  <CardTitle className="text-2xl font-bold">抽籤結果</CardTitle>
                </CardHeader>
                <CardContent className="p-6 overflow-y-auto h-[calc(100%-80px)]">
                  <LotteryResults results={lotteryResults} />
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
