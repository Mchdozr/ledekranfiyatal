import type { UsageType } from "@/lib/db-types";

export type TestScenario = {
  id: string;
  label: string;
  supplierName: string;
  usageType: UsageType;
  width: string;
  height: string;
  area: string;
  distance: string;
  pixelPitch: string;
  application: string;
  city: string;
  installation: string;
};

export const testScenarios: TestScenario[] = [
  {
    id: "dis-mekan-istanbul",
    label: "Dış mekân 4×2 m — İstanbul cephe",
    supplierName: "Örnek LED Firması",
    usageType: "dis-mekan",
    width: "4",
    height: "2",
    area: "8",
    distance: "15",
    pixelPitch: "P6",
    application: "Bina Cephesi / Reklam Panosu",
    city: "İstanbul",
    installation: "evet",
  },
  {
    id: "ic-mekan-avm",
    label: "İç mekân AVM vitrin — P2.5",
    supplierName: "AVM LED Tedarikçisi",
    usageType: "ic-mekan",
    width: "3",
    height: "2",
    area: "6",
    distance: "4",
    pixelPitch: "P2.5",
    application: "AVM / Alışveriş Merkezi",
    city: "Ankara",
    installation: "evet",
  },
  {
    id: "kiralama-konser",
    label: "Rental sahne — 6×4 m konser",
    supplierName: "Sahne Rental Ltd.",
    usageType: "kiralama",
    width: "6",
    height: "4",
    area: "24",
    distance: "20",
    pixelPitch: "P3.9",
    application: "Etkinlik / Sahne / Konser",
    city: "İzmir",
    installation: "evet",
  },
];

export function getTestScenario(id: string): TestScenario | undefined {
  return testScenarios.find((s) => s.id === id);
}
