import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ParkingSpace } from "@/types/ParkingSpace";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ParkingSpaceListProps {
  spaces: ParkingSpace[];
}

const ParkingSpaceList: React.FC<ParkingSpaceListProps> = ({ spaces }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">查看所有車位</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>所有車位列表</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>車位號碼</TableHead>
              <TableHead>大小</TableHead>
              <TableHead>分配</TableHead>
              <TableHead>狀態</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spaces.map((space) => (
              <TableRow key={space.number}>
                <TableCell>{space.number}</TableCell>
                <TableCell>{space.size}</TableCell>
                <TableCell>{space.allocation}</TableCell>
                <TableCell>{space.isAvailable ? "可用" : "已分配"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ParkingSpaceList;
