import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParkingSpace, Resident } from "@/types/ParkingSpace";

interface LotteryResultsProps {
  results: Array<{
    round: number;
    winners: Array<{
      resident: Resident;
      space: ParkingSpace;
    }>;
  }>;
}

const LotteryResults: React.FC<LotteryResultsProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      {results.length === 0 ? (
        <p className="text-center text-gray-500">尚未進行抽籤</p>
      ) : (
        results.map((round) => (
          <Card key={round.round} className="bg-white">
            <CardHeader className="bg-blue-100">
              <CardTitle className="text-lg font-semibold text-blue-700">
                第 {round.round} 輪抽籤結果
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="mt-2 space-y-2">
                {round.winners.map((winner, index) => (
                  <li
                    key={index}
                    className="text-sm flex justify-between items-center py-1 border-b last:border-b-0"
                  >
                    <span>
                      住戶: {winner.resident.unitNumber} ({winner.resident.area}
                      區)
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        winner.space.size === "大"
                          ? "bg-green-100 text-green-800"
                          : winner.space.size === "小"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      車位 {winner.space.number} ({winner.space.size} -{" "}
                      {winner.space.allocation})
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default LotteryResults;
