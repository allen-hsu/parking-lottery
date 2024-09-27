export interface ParkingSpace {
  number: string;
  size: "大" | "小" | "身障";
  allocation: "重" | "A" | "B" | "C" | "店" | "保留";
  isAvailable: boolean;
}

export interface LotteryRules {
  noRestriction: boolean;
  onlyStore: boolean;
  onlyDisabled: boolean;
  onlyMotorcycle: boolean;
  largePriority: boolean;
  excludeStore: boolean;
  excludeDisabled: boolean;
  excludeMotorcycle: boolean;
}

export interface LotteryFormData {
  participants: number;
  rules: LotteryRules;
}

export interface Resident {
  id: string;
  unitNumber: string;
  area: "S" | "A" | "B" | "C";
}

export const residents: Resident[] = [
  { id: "S01F01", unitNumber: "S01F01", area: "S" },
  { id: "S02F01", unitNumber: "S02F01", area: "S" },
  { id: "S03F01", unitNumber: "S03F01", area: "S" },
  { id: "S05F01", unitNumber: "S05F01", area: "S" },
  { id: "S06F01", unitNumber: "S06F01", area: "S" },
  { id: "S07F01", unitNumber: "S07F01", area: "S" },
  { id: "S08F01", unitNumber: "S08F01", area: "S" },
  { id: "S09F01", unitNumber: "S09F01", area: "S" },
  { id: "S10F01", unitNumber: "S10F01", area: "S" },
  { id: "S11F01", unitNumber: "S11F01", area: "S" },
  { id: "S12F01", unitNumber: "S12F01", area: "S" },
  { id: "S13F01", unitNumber: "S13F01", area: "S" },
  { id: "S15F01", unitNumber: "S15F01", area: "S" },
  { id: "S16F01", unitNumber: "S16F01", area: "S" },
  { id: "S17F01", unitNumber: "S17F01", area: "S" },
  { id: "S18F01", unitNumber: "S18F01", area: "S" },
  { id: "S19F01", unitNumber: "S19F01", area: "S" },
  { id: "S20F01", unitNumber: "S20F01", area: "S" },
  { id: "S21F01", unitNumber: "S21F01", area: "S" },
  { id: "S22F01", unitNumber: "S22F01", area: "S" },
  // A區住戶
  ...Array.from({ length: 8 }, (_, i) => i + 1).flatMap((floor) =>
    Array.from({ length: 23 }, (_, i) => i + 3).map((unit) => ({
      id: `A0${floor}F${unit.toString().padStart(2, "0")}`,
      unitNumber: `A0${floor}F${unit.toString().padStart(2, "0")}`,
      area: "A" as const,
    }))
  ),
  // B區住戶
  ...Array.from({ length: 9 }, (_, i) => i + 1).flatMap((floor) =>
    Array.from({ length: 20 }, (_, i) => i + 4).map((unit) => ({
      id: `B0${floor}F${unit.toString().padStart(2, "0")}`,
      unitNumber: `B0${floor}F${unit.toString().padStart(2, "0")}`,
      area: "B" as const,
    }))
  ),
  // C區住戶
  ...Array.from({ length: 9 }, (_, i) => i + 1).flatMap((floor) =>
    Array.from({ length: 21 }, (_, i) => i + 3).map((unit) => ({
      id: `C0${floor}F${unit.toString().padStart(2, "0")}`,
      unitNumber: `C0${floor}F${unit.toString().padStart(2, "0")}`,
      area: "C" as const,
    }))
  ),
];

export const initialParkingSpaces: ParkingSpace[] = [
  { number: "1", size: "大", allocation: "重", isAvailable: true },
  { number: "2", size: "大", allocation: "重", isAvailable: true },
  { number: "3", size: "大", allocation: "重", isAvailable: true },
  { number: "4", size: "大", allocation: "重", isAvailable: true },
  { number: "5", size: "大", allocation: "A", isAvailable: true },
  { number: "6", size: "大", allocation: "A", isAvailable: true },
  { number: "7", size: "大", allocation: "A", isAvailable: true },
  { number: "8", size: "大", allocation: "A", isAvailable: true },
  { number: "9", size: "小", allocation: "A", isAvailable: true },
  { number: "10", size: "小", allocation: "A", isAvailable: true },
  { number: "11", size: "小", allocation: "A", isAvailable: true },
  { number: "12", size: "小", allocation: "店", isAvailable: true },
  { number: "13", size: "小", allocation: "店", isAvailable: true },
  { number: "14", size: "小", allocation: "店", isAvailable: true },
  { number: "15", size: "小", allocation: "店", isAvailable: true },
  { number: "16", size: "小", allocation: "店", isAvailable: true },
  { number: "17A", size: "身障", allocation: "保留", isAvailable: false },
  { number: "17B", size: "身障", allocation: "保留", isAvailable: false },
  { number: "18A", size: "身障", allocation: "保留", isAvailable: false },
  { number: "18B", size: "身障", allocation: "保留", isAvailable: false },
  { number: "19", size: "小", allocation: "重", isAvailable: true },
  { number: "20", size: "小", allocation: "重", isAvailable: true },
  { number: "21", size: "大", allocation: "重", isAvailable: true },
  { number: "22", size: "大", allocation: "重", isAvailable: true },
  { number: "23A", size: "身障", allocation: "保留", isAvailable: false },
  { number: "23B", size: "身障", allocation: "保留", isAvailable: false },
  { number: "24A", size: "身障", allocation: "保留", isAvailable: false },
  { number: "24B", size: "身障", allocation: "保留", isAvailable: false },
  { number: "25A", size: "身障", allocation: "保留", isAvailable: false },
  { number: "25B", size: "身障", allocation: "保留", isAvailable: false },
  { number: "26A", size: "身障", allocation: "保留", isAvailable: false },
  { number: "26B", size: "身障", allocation: "保留", isAvailable: false },
  { number: "27", size: "小", allocation: "店", isAvailable: true },
  { number: "28", size: "身障", allocation: "保留", isAvailable: false },
  { number: "29", size: "身障", allocation: "保留", isAvailable: false },
  { number: "30", size: "身障", allocation: "保留", isAvailable: false },
  { number: "31", size: "身障", allocation: "保留", isAvailable: false },
  { number: "32", size: "大", allocation: "A", isAvailable: true },
  { number: "33", size: "大", allocation: "A", isAvailable: true },
  { number: "34", size: "大", allocation: "A", isAvailable: true },
  { number: "35", size: "大", allocation: "A", isAvailable: true },
  { number: "36", size: "大", allocation: "A", isAvailable: true },
  { number: "37", size: "大", allocation: "A", isAvailable: true },
  { number: "38", size: "大", allocation: "A", isAvailable: true },
  { number: "39", size: "大", allocation: "A", isAvailable: true },
  { number: "40", size: "大", allocation: "A", isAvailable: true },
  { number: "41", size: "大", allocation: "A", isAvailable: true },
  { number: "42", size: "大", allocation: "A", isAvailable: true },
  { number: "43", size: "大", allocation: "A", isAvailable: true },
  { number: "44", size: "大", allocation: "A", isAvailable: true },
  { number: "45", size: "大", allocation: "A", isAvailable: true },
  { number: "46", size: "大", allocation: "A", isAvailable: true },
  { number: "47", size: "大", allocation: "A", isAvailable: true },
  { number: "48", size: "大", allocation: "A", isAvailable: true },
  { number: "49", size: "大", allocation: "B", isAvailable: true },
  { number: "50", size: "大", allocation: "B", isAvailable: true },
  { number: "51", size: "大", allocation: "B", isAvailable: true },
  { number: "52", size: "大", allocation: "B", isAvailable: true },
  { number: "53", size: "大", allocation: "B", isAvailable: true },
  { number: "54", size: "大", allocation: "B", isAvailable: true },
  { number: "55", size: "大", allocation: "B", isAvailable: true },
  { number: "56", size: "大", allocation: "B", isAvailable: true },
  { number: "57", size: "大", allocation: "B", isAvailable: true },
  { number: "58", size: "大", allocation: "B", isAvailable: true },
  { number: "59", size: "大", allocation: "B", isAvailable: true },
  { number: "60", size: "大", allocation: "B", isAvailable: true },
  { number: "61", size: "大", allocation: "B", isAvailable: true },
  { number: "62", size: "大", allocation: "B", isAvailable: true },
  { number: "63", size: "大", allocation: "B", isAvailable: true },
  { number: "64", size: "大", allocation: "B", isAvailable: true },
  { number: "65", size: "大", allocation: "B", isAvailable: true },
  { number: "66", size: "大", allocation: "B", isAvailable: true },
  { number: "67", size: "大", allocation: "B", isAvailable: true },
  { number: "68", size: "大", allocation: "C", isAvailable: true },
  { number: "69", size: "大", allocation: "C", isAvailable: true },
  { number: "70", size: "大", allocation: "C", isAvailable: true },
  { number: "71", size: "大", allocation: "C", isAvailable: true },
  { number: "72", size: "大", allocation: "C", isAvailable: true },
  { number: "73", size: "大", allocation: "C", isAvailable: true },
  { number: "74", size: "大", allocation: "C", isAvailable: true },
  { number: "75", size: "大", allocation: "C", isAvailable: true },
  { number: "76", size: "大", allocation: "C", isAvailable: true },
  { number: "77", size: "大", allocation: "C", isAvailable: true },
  { number: "78", size: "大", allocation: "C", isAvailable: true },
  { number: "79", size: "大", allocation: "C", isAvailable: true },
  { number: "80", size: "大", allocation: "C", isAvailable: true },
  { number: "81", size: "大", allocation: "C", isAvailable: true },
  { number: "82", size: "大", allocation: "C", isAvailable: true },
  { number: "83", size: "大", allocation: "C", isAvailable: true },
  { number: "84", size: "大", allocation: "C", isAvailable: true },
  { number: "85", size: "大", allocation: "C", isAvailable: true },
  { number: "86", size: "大", allocation: "C", isAvailable: true },
  { number: "87", size: "大", allocation: "C", isAvailable: true },
  { number: "88", size: "大", allocation: "C", isAvailable: true },
  { number: "89", size: "大", allocation: "C", isAvailable: true },
  { number: "90", size: "大", allocation: "C", isAvailable: true },
  { number: "91", size: "大", allocation: "C", isAvailable: true },
  { number: "92", size: "小", allocation: "C", isAvailable: true },
  { number: "93", size: "小", allocation: "C", isAvailable: true },
  { number: "94", size: "大", allocation: "C", isAvailable: true },
  { number: "95", size: "大", allocation: "C", isAvailable: true },
  { number: "96", size: "大", allocation: "C", isAvailable: true },
  { number: "97", size: "小", allocation: "C", isAvailable: true },
  { number: "98", size: "小", allocation: "C", isAvailable: true },
  { number: "99", size: "小", allocation: "C", isAvailable: true },
  { number: "100", size: "小", allocation: "C", isAvailable: true },
  { number: "101", size: "大", allocation: "C", isAvailable: true },
  { number: "102", size: "大", allocation: "C", isAvailable: true },
  { number: "103", size: "大", allocation: "B", isAvailable: true },
  { number: "104", size: "小", allocation: "B", isAvailable: true },
  { number: "105", size: "大", allocation: "B", isAvailable: true },
  { number: "106", size: "大", allocation: "B", isAvailable: true },
  { number: "107", size: "大", allocation: "B", isAvailable: true },
  { number: "108", size: "大", allocation: "B", isAvailable: true },
  { number: "109", size: "大", allocation: "B", isAvailable: true },
  { number: "110", size: "大", allocation: "B", isAvailable: true },
  { number: "111", size: "大", allocation: "B", isAvailable: true },
  { number: "112", size: "大", allocation: "B", isAvailable: true },
  { number: "113", size: "大", allocation: "B", isAvailable: true },
  { number: "114", size: "大", allocation: "B", isAvailable: true },
  { number: "115", size: "大", allocation: "B", isAvailable: true },
  { number: "116", size: "大", allocation: "B", isAvailable: true },
  { number: "117", size: "大", allocation: "B", isAvailable: true },
  { number: "118", size: "大", allocation: "A", isAvailable: true },
  { number: "119", size: "大", allocation: "A", isAvailable: true },
  { number: "120", size: "大", allocation: "A", isAvailable: true },
  { number: "121", size: "大", allocation: "A", isAvailable: true },
  { number: "122", size: "大", allocation: "A", isAvailable: true },
  { number: "123", size: "大", allocation: "A", isAvailable: true },
  { number: "124", size: "大", allocation: "A", isAvailable: true },
  { number: "125", size: "", allocation: "A", isAvailable: true },
  { number: "126", size: "小", allocation: "A", isAvailable: true },
  { number: "127", size: "小", allocation: "A", isAvailable: true },
  { number: "128", size: "小", allocation: "A", isAvailable: true },
  { number: "129", size: "小", allocation: "A", isAvailable: true },
  { number: "130", size: "小", allocation: "A", isAvailable: true },
  { number: "131", size: "大", allocation: "A", isAvailable: true },
  { number: "132", size: "大", allocation: "A", isAvailable: true },
  { number: "133", size: "大", allocation: "A", isAvailable: true },
  { number: "134", size: "大", allocation: "A", isAvailable: true },
  { number: "135", size: "大", allocation: "A", isAvailable: true },
  { number: "136", size: "大", allocation: "A", isAvailable: true },
  { number: "137", size: "大", allocation: "A", isAvailable: true },
  { number: "138", size: "大", allocation: "A", isAvailable: true },
  { number: "139", size: "大", allocation: "A", isAvailable: true },
  { number: "140", size: "大", allocation: "A", isAvailable: true },
  { number: "141", size: "大", allocation: "A", isAvailable: true },
  { number: "142", size: "大", allocation: "A", isAvailable: true },
  { number: "143", size: "大", allocation: "A", isAvailable: true },
  { number: "144", size: "大", allocation: "A", isAvailable: true },
  { number: "145", size: "大", allocation: "A", isAvailable: true },
  { number: "146", size: "大", allocation: "A", isAvailable: true },
  { number: "147", size: "大", allocation: "A", isAvailable: true },
  { number: "148", size: "大", allocation: "A", isAvailable: true },
  { number: "149", size: "大", allocation: "A", isAvailable: true },
  { number: "150", size: "大", allocation: "A", isAvailable: true },
  { number: "151", size: "大", allocation: "A", isAvailable: true },
  { number: "152", size: "大", allocation: "A", isAvailable: true },
  { number: "153", size: "大", allocation: "A", isAvailable: true },
  { number: "154", size: "大", allocation: "A", isAvailable: true },
  { number: "155", size: "大", allocation: "A", isAvailable: true },
  { number: "156", size: "大", allocation: "A", isAvailable: true },
  { number: "157", size: "大", allocation: "A", isAvailable: true },
  { number: "158", size: "大", allocation: "A", isAvailable: true },
  { number: "159", size: "小", allocation: "A", isAvailable: true },
  { number: "160", size: "大", allocation: "A", isAvailable: true },
  { number: "161", size: "大", allocation: "A", isAvailable: true },
  { number: "162", size: "大", allocation: "A", isAvailable: true },
  { number: "163", size: "大", allocation: "A", isAvailable: true },
  { number: "164", size: "大", allocation: "A", isAvailable: true },
  { number: "165", size: "大", allocation: "A", isAvailable: true },
  { number: "166", size: "大", allocation: "A", isAvailable: true },
  { number: "167", size: "大", allocation: "A", isAvailable: true },
  { number: "168", size: "小", allocation: "B", isAvailable: true },
  { number: "169", size: "大", allocation: "B", isAvailable: true },
  { number: "170", size: "大", allocation: "B", isAvailable: true },
  { number: "171", size: "大", allocation: "B", isAvailable: true },
  { number: "172", size: "大", allocation: "B", isAvailable: true },
  { number: "173", size: "大", allocation: "B", isAvailable: true },
  { number: "174", size: "大", allocation: "B", isAvailable: true },
  { number: "175", size: "大", allocation: "B", isAvailable: true },
  { number: "176", size: "大", allocation: "B", isAvailable: true },
  { number: "177", size: "大", allocation: "B", isAvailable: true },
  { number: "178", size: "大", allocation: "B", isAvailable: true },
  { number: "179", size: "大", allocation: "B", isAvailable: true },
  { number: "180", size: "大", allocation: "B", isAvailable: true },
  { number: "181", size: "大", allocation: "B", isAvailable: true },
  { number: "182", size: "大", allocation: "B", isAvailable: true },
  { number: "183", size: "大", allocation: "B", isAvailable: true },
  { number: "184", size: "大", allocation: "B", isAvailable: true },
  { number: "185", size: "大", allocation: "B", isAvailable: true },
  { number: "186", size: "大", allocation: "B", isAvailable: true },
  { number: "187", size: "大", allocation: "B", isAvailable: true },
  { number: "188", size: "大", allocation: "B", isAvailable: true },
  { number: "189", size: "大", allocation: "B", isAvailable: true },
  { number: "190", size: "大", allocation: "B", isAvailable: true },
  { number: "191", size: "大", allocation: "B", isAvailable: true },
  { number: "192", size: "大", allocation: "B", isAvailable: true },
  { number: "193", size: "大", allocation: "B", isAvailable: true },
  { number: "194", size: "大", allocation: "B", isAvailable: true },
  { number: "195", size: "大", allocation: "B", isAvailable: true },
  { number: "196", size: "大", allocation: "B", isAvailable: true },
  { number: "197", size: "大", allocation: "B", isAvailable: true },
  { number: "198", size: "大", allocation: "B", isAvailable: true },
  { number: "199", size: "大", allocation: "B", isAvailable: true },
  { number: "200", size: "大", allocation: "B", isAvailable: true },
  { number: "201", size: "大", allocation: "C", isAvailable: true },
  { number: "202", size: "大", allocation: "C", isAvailable: true },
  { number: "203", size: "大", allocation: "C", isAvailable: true },
  { number: "204", size: "大", allocation: "C", isAvailable: true },
  { number: "205", size: "大", allocation: "C", isAvailable: true },
  { number: "206", size: "大", allocation: "C", isAvailable: true },
  { number: "207", size: "大", allocation: "C", isAvailable: true },
  { number: "208", size: "大", allocation: "C", isAvailable: true },
  { number: "209", size: "大", allocation: "C", isAvailable: true },
  { number: "210", size: "大", allocation: "C", isAvailable: true },
  { number: "211", size: "大", allocation: "C", isAvailable: true },
  { number: "212", size: "大", allocation: "C", isAvailable: true },
  { number: "213", size: "大", allocation: "C", isAvailable: true },
  { number: "214", size: "大", allocation: "C", isAvailable: true },
  { number: "215", size: "大", allocation: "C", isAvailable: true },
  { number: "216", size: "大", allocation: "C", isAvailable: true },
  { number: "217", size: "大", allocation: "C", isAvailable: true },
  { number: "218", size: "大", allocation: "C", isAvailable: true },
  { number: "219", size: "大", allocation: "C", isAvailable: true },
  { number: "220", size: "大", allocation: "C", isAvailable: true },
  { number: "221", size: "大", allocation: "C", isAvailable: true },
  { number: "222", size: "大", allocation: "C", isAvailable: true },
  { number: "223", size: "大", allocation: "C", isAvailable: true },
  { number: "224", size: "大", allocation: "C", isAvailable: true },
  { number: "225", size: "小", allocation: "C", isAvailable: true },
  { number: "226", size: "小", allocation: "C", isAvailable: true },
  { number: "227", size: "小", allocation: "C", isAvailable: true },
  { number: "228", size: "小", allocation: "C", isAvailable: true },
  { number: "229", size: "大", allocation: "C", isAvailable: true },
  { number: "230", size: "大", allocation: "C", isAvailable: true },
  { number: "231", size: "大", allocation: "C", isAvailable: true },
  { number: "232", size: "大", allocation: "C", isAvailable: true },
  { number: "233", size: "大", allocation: "C", isAvailable: true },
  { number: "234", size: "大", allocation: "C", isAvailable: true },
  { number: "235", size: "小", allocation: "C", isAvailable: true },
  { number: "236", size: "小", allocation: "C", isAvailable: true },
  { number: "237", size: "小", allocation: "C", isAvailable: true },
  { number: "238", size: "小", allocation: "C", isAvailable: true },
  { number: "239", size: "小", allocation: "C", isAvailable: true },
  { number: "240", size: "小", allocation: "C", isAvailable: true },
  { number: "241", size: "小", allocation: "C", isAvailable: true },
  { number: "242", size: "小", allocation: "C", isAvailable: true },
  { number: "243", size: "小", allocation: "C", isAvailable: true },
  { number: "244", size: "小", allocation: "C", isAvailable: true },
  { number: "245", size: "小", allocation: "C", isAvailable: true },
  { number: "246", size: "小", allocation: "C", isAvailable: true },
  { number: "247", size: "小", allocation: "C", isAvailable: true },
  { number: "248", size: "小", allocation: "C", isAvailable: true },
  { number: "249", size: "小", allocation: "C", isAvailable: true },
  { number: "250", size: "小", allocation: "C", isAvailable: true },
  { number: "251", size: "小", allocation: "C", isAvailable: true },
  { number: "252", size: "大", allocation: "C", isAvailable: true },
  { number: "253", size: "大", allocation: "C", isAvailable: true },
  { number: "254", size: "大", allocation: "C", isAvailable: true },
  { number: "255", size: "大", allocation: "C", isAvailable: true },
  { number: "256", size: "大", allocation: "C", isAvailable: true },
  { number: "257", size: "大", allocation: "C", isAvailable: true },
  { number: "258", size: "大", allocation: "C", isAvailable: true },
  { number: "259", size: "小", allocation: "C", isAvailable: true },
  { number: "260", size: "小", allocation: "C", isAvailable: true },
  { number: "261", size: "小", allocation: "C", isAvailable: true },
  { number: "262", size: "大", allocation: "C", isAvailable: true },
  { number: "263", size: "大", allocation: "C", isAvailable: true },
  { number: "264", size: "大", allocation: "C", isAvailable: true },
  { number: "265", size: "大", allocation: "C", isAvailable: true },
  { number: "266", size: "大", allocation: "C", isAvailable: true },
  { number: "267", size: "大", allocation: "C", isAvailable: true },
  { number: "268", size: "大", allocation: "C", isAvailable: true },
  { number: "269", size: "大", allocation: "C", isAvailable: true },
  { number: "270", size: "大", allocation: "C", isAvailable: true },
  { number: "271", size: "大", allocation: "C", isAvailable: true },
  { number: "272", size: "大", allocation: "C", isAvailable: true },
  { number: "273", size: "大", allocation: "C", isAvailable: true },
  { number: "274", size: "大", allocation: "C", isAvailable: true },
  { number: "275", size: "大", allocation: "C", isAvailable: true },
  { number: "276", size: "大", allocation: "C", isAvailable: true },
  { number: "277", size: "大", allocation: "B", isAvailable: true },
  { number: "278", size: "大", allocation: "B", isAvailable: true },
  { number: "279", size: "小", allocation: "B", isAvailable: true },
  { number: "280", size: "小", allocation: "B", isAvailable: true },
  { number: "281", size: "小", allocation: "B", isAvailable: true },
  { number: "282", size: "大", allocation: "B", isAvailable: true },
  { number: "283", size: "大", allocation: "B", isAvailable: true },
  { number: "284", size: "大", allocation: "B", isAvailable: true },
  { number: "285", size: "大", allocation: "B", isAvailable: true },
  { number: "286", size: "小", allocation: "B", isAvailable: true },
  { number: "287", size: "大", allocation: "B", isAvailable: true },
  { number: "288", size: "大", allocation: "B", isAvailable: true },
  { number: "289", size: "大", allocation: "B", isAvailable: true },
  { number: "290", size: "大", allocation: "B", isAvailable: true },
  { number: "291", size: "大", allocation: "B", isAvailable: true },
  { number: "292", size: "大", allocation: "B", isAvailable: true },
  { number: "293", size: "小", allocation: "B", isAvailable: true },
  { number: "294", size: "小", allocation: "B", isAvailable: true },
  { number: "295", size: "大", allocation: "B", isAvailable: true },
  { number: "296", size: "大", allocation: "B", isAvailable: true },
  { number: "297", size: "大", allocation: "A", isAvailable: true },
  { number: "298", size: "大", allocation: "A", isAvailable: true },
  { number: "299", size: "大", allocation: "A", isAvailable: true },
  { number: "300", size: "大", allocation: "A", isAvailable: true },
  { number: "301", size: "小", allocation: "A", isAvailable: true },
  { number: "302", size: "小", allocation: "A", isAvailable: true },
  { number: "303", size: "大", allocation: "A", isAvailable: true },
  { number: "304", size: "大", allocation: "A", isAvailable: true },
  { number: "305", size: "大", allocation: "A", isAvailable: true },
  { number: "306", size: "小", allocation: "A", isAvailable: true },
  { number: "307", size: "小", allocation: "A", isAvailable: true },
  { number: "308", size: "小", allocation: "A", isAvailable: true },
  { number: "309", size: "小", allocation: "A", isAvailable: true },
  { number: "310", size: "小", allocation: "A", isAvailable: true },
  { number: "311", size: "小", allocation: "A", isAvailable: true },
  { number: "312", size: "小", allocation: "A", isAvailable: true },
  { number: "313", size: "小", allocation: "A", isAvailable: true },
  { number: "314", size: "小", allocation: "A", isAvailable: true },
  { number: "315", size: "小", allocation: "A", isAvailable: true },
  { number: "316", size: "小", allocation: "A", isAvailable: true },
  { number: "317", size: "小", allocation: "A", isAvailable: true },
  { number: "318", size: "小", allocation: "A", isAvailable: true },
  { number: "319", size: "小", allocation: "A", isAvailable: true },
  { number: "320", size: "小", allocation: "A", isAvailable: true },
  { number: "321", size: "小", allocation: "A", isAvailable: true },
  { number: "322", size: "小", allocation: "A", isAvailable: true },
  { number: "323", size: "小", allocation: "A", isAvailable: true },
  { number: "324", size: "小", allocation: "A", isAvailable: true },
  { number: "325", size: "小", allocation: "A", isAvailable: true },
  { number: "326", size: "小", allocation: "A", isAvailable: true },
  { number: "327", size: "小", allocation: "A", isAvailable: true },
  { number: "328", size: "小", allocation: "A", isAvailable: true },
  { number: "329", size: "小", allocation: "A", isAvailable: true },
  { number: "330", size: "小", allocation: "A", isAvailable: true },
  { number: "331", size: "小", allocation: "A", isAvailable: true },
  { number: "332", size: "小", allocation: "店", isAvailable: true },
  { number: "333", size: "小", allocation: "店", isAvailable: true },
  { number: "334", size: "小", allocation: "店", isAvailable: true },
  { number: "335", size: "小", allocation: "店", isAvailable: true },
  { number: "336", size: "小", allocation: "店", isAvailable: true },
  { number: "337", size: "小", allocation: "店", isAvailable: true },
  { number: "338", size: "小", allocation: "店", isAvailable: true },
  { number: "339", size: "小", allocation: "店", isAvailable: true },
  { number: "340", size: "小", allocation: "店", isAvailable: true },
  { number: "341", size: "小", allocation: "店", isAvailable: true },
  { number: "342", size: "小", allocation: "店", isAvailable: true },
  { number: "343", size: "小", allocation: "店", isAvailable: true },
  { number: "344", size: "小", allocation: "店", isAvailable: true },
  { number: "345", size: "小", allocation: "店", isAvailable: true },
  { number: "346", size: "小", allocation: "A", isAvailable: true },
  { number: "347", size: "小", allocation: "A", isAvailable: true },
  { number: "348", size: "小", allocation: "A", isAvailable: true },
  { number: "349", size: "小", allocation: "A", isAvailable: true },
  { number: "350", size: "小", allocation: "A", isAvailable: true },
  { number: "351", size: "小", allocation: "A", isAvailable: true },
  { number: "352", size: "小", allocation: "A", isAvailable: true },
  { number: "353", size: "小", allocation: "A", isAvailable: true },
  { number: "354", size: "小", allocation: "A", isAvailable: true },
  { number: "355", size: "小", allocation: "A", isAvailable: true },
  { number: "356", size: "小", allocation: "A", isAvailable: true },
  { number: "357", size: "小", allocation: "A", isAvailable: true },
  { number: "358", size: "小", allocation: "A", isAvailable: true },
  { number: "359", size: "小", allocation: "A", isAvailable: true },
  { number: "360", size: "小", allocation: "A", isAvailable: true },
  { number: "361", size: "小", allocation: "A", isAvailable: true },
  { number: "362", size: "小", allocation: "B", isAvailable: true },
  { number: "363", size: "小", allocation: "B", isAvailable: true },
  { number: "364", size: "小", allocation: "B", isAvailable: true },
  { number: "365", size: "小", allocation: "B", isAvailable: true },
  { number: "366", size: "小", allocation: "B", isAvailable: true },
  { number: "367", size: "小", allocation: "B", isAvailable: true },
  { number: "368", size: "小", allocation: "B", isAvailable: true },
  { number: "369", size: "小", allocation: "B", isAvailable: true },
  { number: "370", size: "小", allocation: "B", isAvailable: true },
  { number: "371", size: "小", allocation: "B", isAvailable: true },
  { number: "372", size: "小", allocation: "B", isAvailable: true },
  { number: "373", size: "小", allocation: "B", isAvailable: true },
  { number: "374", size: "小", allocation: "B", isAvailable: true },
  { number: "375", size: "小", allocation: "B", isAvailable: true },
  { number: "376", size: "小", allocation: "B", isAvailable: true },
  { number: "377", size: "小", allocation: "B", isAvailable: true },
  { number: "378", size: "小", allocation: "B", isAvailable: true },
  { number: "379", size: "小", allocation: "B", isAvailable: true },
  { number: "380", size: "小", allocation: "B", isAvailable: true },
  { number: "381", size: "小", allocation: "B", isAvailable: true },
  { number: "382", size: "小", allocation: "B", isAvailable: true },
  { number: "383", size: "小", allocation: "B", isAvailable: true },
  { number: "384", size: "小", allocation: "B", isAvailable: true },
  { number: "385", size: "小", allocation: "B", isAvailable: true },
  { number: "386", size: "小", allocation: "B", isAvailable: true },
  { number: "387", size: "小", allocation: "B", isAvailable: true },
  { number: "388", size: "小", allocation: "B", isAvailable: true },
  { number: "389", size: "小", allocation: "B", isAvailable: true },
  { number: "390", size: "小", allocation: "B", isAvailable: true },
  { number: "391", size: "小", allocation: "B", isAvailable: true },
  { number: "392", size: "小", allocation: "B", isAvailable: true },
  { number: "393", size: "小", allocation: "B", isAvailable: true },
  { number: "394", size: "小", allocation: "B", isAvailable: true },
  { number: "395", size: "小", allocation: "B", isAvailable: true },
  { number: "396", size: "小", allocation: "C", isAvailable: true },
  { number: "397", size: "小", allocation: "C", isAvailable: true },
  { number: "398", size: "小", allocation: "C", isAvailable: true },
  { number: "399", size: "小", allocation: "C", isAvailable: true },
  { number: "400", size: "小", allocation: "C", isAvailable: true },
  { number: "401", size: "小", allocation: "C", isAvailable: true },
  { number: "402", size: "小", allocation: "C", isAvailable: true },
  { number: "403", size: "小", allocation: "C", isAvailable: true },
  { number: "404", size: "小", allocation: "C", isAvailable: true },
  { number: "405", size: "小", allocation: "C", isAvailable: true },
  { number: "406", size: "小", allocation: "C", isAvailable: true },
  { number: "407", size: "小", allocation: "C", isAvailable: true },
  { number: "408", size: "小", allocation: "C", isAvailable: true },
  { number: "409", size: "小", allocation: "C", isAvailable: true },
  { number: "410", size: "小", allocation: "C", isAvailable: true },
  { number: "411", size: "小", allocation: "C", isAvailable: true },
  { number: "412", size: "小", allocation: "C", isAvailable: true },
  { number: "413", size: "小", allocation: "C", isAvailable: true },
  { number: "414", size: "小", allocation: "C", isAvailable: true },
  { number: "415", size: "小", allocation: "C", isAvailable: true },
  { number: "416", size: "小", allocation: "C", isAvailable: true },
  { number: "417", size: "小", allocation: "C", isAvailable: true },
  { number: "418", size: "小", allocation: "C", isAvailable: true },
  { number: "419", size: "小", allocation: "C", isAvailable: true },
  { number: "420", size: "小", allocation: "C", isAvailable: true },
  { number: "421", size: "小", allocation: "C", isAvailable: true },
  { number: "422", size: "小", allocation: "C", isAvailable: true },
  { number: "423", size: "小", allocation: "C", isAvailable: true },
  { number: "424", size: "小", allocation: "C", isAvailable: true },
  { number: "425", size: "小", allocation: "C", isAvailable: true },
  { number: "426", size: "小", allocation: "C", isAvailable: true },
  { number: "427", size: "小", allocation: "C", isAvailable: true },
  { number: "428", size: "小", allocation: "C", isAvailable: true },
  { number: "429", size: "小", allocation: "C", isAvailable: true },
  { number: "430", size: "小", allocation: "C", isAvailable: true },
  { number: "431", size: "小", allocation: "C", isAvailable: true },
  { number: "432", size: "小", allocation: "C", isAvailable: true },
  { number: "433", size: "小", allocation: "C", isAvailable: true },
  { number: "434", size: "小", allocation: "C", isAvailable: true },
  { number: "435", size: "小", allocation: "C", isAvailable: true },
  { number: "436", size: "小", allocation: "C", isAvailable: true },
  { number: "437", size: "小", allocation: "C", isAvailable: true },
  { number: "438", size: "小", allocation: "C", isAvailable: true },
  { number: "439", size: "小", allocation: "C", isAvailable: true },
  { number: "440", size: "小", allocation: "C", isAvailable: true },
  { number: "441", size: "小", allocation: "C", isAvailable: true },
  { number: "442", size: "小", allocation: "C", isAvailable: true },
  { number: "443", size: "小", allocation: "C", isAvailable: true },
  { number: "444", size: "小", allocation: "C", isAvailable: true },
  { number: "445", size: "小", allocation: "B", isAvailable: true },
  { number: "446", size: "小", allocation: "B", isAvailable: true },
  { number: "447", size: "小", allocation: "B", isAvailable: true },
  { number: "448", size: "小", allocation: "B", isAvailable: true },
  { number: "449", size: "小", allocation: "B", isAvailable: true },
  { number: "450", size: "小", allocation: "B", isAvailable: true },
  { number: "451", size: "小", allocation: "B", isAvailable: true },
  { number: "452", size: "小", allocation: "B", isAvailable: true },
  { number: "453", size: "小", allocation: "B", isAvailable: true },
  { number: "454", size: "小", allocation: "B", isAvailable: true },
  { number: "455", size: "小", allocation: "B", isAvailable: true },
  { number: "456", size: "小", allocation: "B", isAvailable: true },
  { number: "457", size: "小", allocation: "B", isAvailable: true },
  { number: "458", size: "小", allocation: "B", isAvailable: true },
  { number: "459", size: "小", allocation: "B", isAvailable: true },
  { number: "460", size: "小", allocation: "B", isAvailable: true },
  { number: "461", size: "小", allocation: "B", isAvailable: true },
  { number: "462", size: "小", allocation: "B", isAvailable: true },
  { number: "463", size: "小", allocation: "B", isAvailable: true },
  { number: "464", size: "小", allocation: "B", isAvailable: true },
  { number: "465", size: "小", allocation: "B", isAvailable: true },
  { number: "466", size: "小", allocation: "B", isAvailable: true },
  { number: "467", size: "小", allocation: "B", isAvailable: true },
  { number: "468", size: "小", allocation: "B", isAvailable: true },
  { number: "469", size: "小", allocation: "B", isAvailable: true },
  { number: "470", size: "小", allocation: "B", isAvailable: true },
  { number: "471", size: "小", allocation: "B", isAvailable: true },
  { number: "472", size: "小", allocation: "B", isAvailable: true },
  { number: "473", size: "小", allocation: "B", isAvailable: true },
  { number: "474", size: "小", allocation: "B", isAvailable: true },
  { number: "475", size: "小", allocation: "B", isAvailable: true },
  { number: "476", size: "小", allocation: "B", isAvailable: true },
  { number: "477", size: "小", allocation: "B", isAvailable: true },
  { number: "478", size: "小", allocation: "B", isAvailable: true },
  { number: "479", size: "小", allocation: "A", isAvailable: true },
  { number: "480", size: "小", allocation: "A", isAvailable: true },
  { number: "481", size: "小", allocation: "A", isAvailable: true },
  { number: "482", size: "小", allocation: "A", isAvailable: true },
  { number: "483", size: "小", allocation: "A", isAvailable: true },
  { number: "484", size: "小", allocation: "A", isAvailable: true },
  { number: "485", size: "小", allocation: "A", isAvailable: true },
  { number: "486", size: "小", allocation: "A", isAvailable: true },
  { number: "487", size: "小", allocation: "A", isAvailable: true },
  { number: "488", size: "小", allocation: "A", isAvailable: true },
  { number: "489", size: "小", allocation: "A", isAvailable: true },
  { number: "490", size: "小", allocation: "A", isAvailable: true },
  { number: "491", size: "小", allocation: "A", isAvailable: true },
  { number: "492", size: "小", allocation: "A", isAvailable: true },
  { number: "493", size: "小", allocation: "A", isAvailable: true },
  { number: "494", size: "小", allocation: "A", isAvailable: true },
];
