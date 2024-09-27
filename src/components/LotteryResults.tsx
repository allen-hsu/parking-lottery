import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParkingSpace, Resident } from "@/types/ParkingSpace";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const getSizeColor = (size: string) => {
    switch (size) {
      case "大":
        return "text-green-600 font-semibold";
      case "小":
        return "text-blue-600 font-semibold";
      case "身障":
        return "text-yellow-600 font-semibold";
      default:
        return "";
    }
  };

  const getAllocationColor = (allocation: string) => {
    switch (allocation) {
      case "A":
        return "text-purple-600 font-semibold";
      case "B":
        return "text-orange-600 font-semibold";
      case "C":
        return "text-pink-600 font-semibold";
      case "重":
        return "text-red-600 font-semibold";
      case "店":
        return "text-indigo-600 font-semibold";
      case "保留":
        return "text-gray-600 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>住戶</TableHead>
                    <TableHead>區域</TableHead>
                    <TableHead>車位號碼</TableHead>
                    <TableHead>車位大小</TableHead>
                    <TableHead>車位分配</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {round.winners.map((winner, index) => (
                    <TableRow key={index}>
                      <TableCell>{winner.resident.unitNumber}</TableCell>
                      <TableCell>{winner.resident.area}</TableCell>
                      <TableCell>{winner.space.number}</TableCell>
                      <TableCell className={getSizeColor(winner.space.size)}>
                        {winner.space.size}
                      </TableCell>
                      <TableCell
                        className={getAllocationColor(winner.space.allocation)}
                      >
                        {winner.space.allocation}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default LotteryResults;
