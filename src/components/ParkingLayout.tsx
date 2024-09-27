import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <Tabs defaultValue="layout1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="layout1">配置圖 1</TabsTrigger>
            <TabsTrigger value="layout2">配置圖 2</TabsTrigger>
          </TabsList>
          <TabsContent value="layout1">
            <div className="overflow-auto">
              <img
                src="/parking-layout.jpg"
                alt="車位配置圖 1"
                className="w-full h-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="layout2">
            <div className="overflow-auto">
              <img
                src="/parking-layout2.jpg"
                alt="車位配置圖 2"
                className="w-full h-auto"
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ParkingLayout;
