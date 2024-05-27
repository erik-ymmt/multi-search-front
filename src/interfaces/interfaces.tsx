export interface SearchResponse {
  resultsCount: number;
  results: SearchResults
}

export interface SearchResults {
  Equipments?: Equipment[];
  Materials?: Material[];
  SalesOrders?: SalesOrder[];
  PurchaseOrders?: PurchaseOrder[];
  Workforce?: Workforce[];
}

export interface Equipment {
  EquipmentID: string;
  EquipmentName: string;
}

export interface Material {
  MaterialID: string;
  MaterialName: string;
}

export interface SalesOrder {
  SalesOrderID: number;
  DeliveryDate?: string;
  Customer?: string;
  MaterialID?: string;
  MaterialName: string;
  Quantity: number;
  TotalValue?: number;
}

export interface PurchaseOrder {
  PurchaseOrderID: number;
  DeliveryDate?: string;
  Supplier?: string;
  MaterialID?: string;
  MaterialName: string;
  Quantity: number;
  TotalCost?: number;
}

export interface Workforce {
  WorkforceID: number;
  Name: string;
  Shift?: string;
}

export type ResultData = Equipment | Material | SalesOrder | PurchaseOrder | Workforce;

export interface MapCategory {
  [key: string]: { titlePtg: string; id: string };
}

export interface SettingsAlertProps {
  setServerLocal: (value: boolean) => void;
}

export interface ItemInfoProps {
  toggleDetails: (index: string | null) => void;
  data?: PurchaseOrderInfo | SalesOrderInfo;
}

interface SalesOrderInfo {
  "Data de Entrega"?: string;
  "Cliente"?: string;
  "ID Material"?: string;
  "Valor"?: string;
}

interface PurchaseOrderInfo {
  "Data de Entrega"?: string;
  "Fornecedor"?: string;
  "ID Material"?: string;
  "Custo": string;
}