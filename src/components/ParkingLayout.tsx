import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ParkingLayout: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">查看車位配置圖</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>車位配置圖</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto">
          <img
            src="/parking-layout.jpg"
            alt="車位配置圖"
            className="w-full h-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParkingLayout;
