import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Resident } from "@/types/ParkingSpace";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ResidentListProps {
  residents: Resident[];
}

const ResidentList: React.FC<ResidentListProps> = ({ residents }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">查看住戶列表</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>住戶列表</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>住戶ID</TableHead>
              <TableHead>單位號碼</TableHead>
              <TableHead>區域</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {residents.map((resident) => (
              <TableRow key={resident.id}>
                <TableCell>{resident.id}</TableCell>
                <TableCell>{resident.unitNumber}</TableCell>
                <TableCell>{resident.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ResidentList;
