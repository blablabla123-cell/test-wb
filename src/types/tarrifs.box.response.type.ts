export interface TariffsBoxResponse {
    dtNextBoxes: string;
    dtTillMax: string;
    warehouseList: Warehouse[];
}

export interface Warehouse {
    id: number;
    warehouseName: string;
    geoName: string;
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
}

export interface TariffsBoxRecord extends Warehouse {
    date: string;                  
    createdAt: Date;
    updatedAt: Date;
}

export class TarriffsBoxTransformer {
  static transform(
    warehouses: Warehouse[], 
    date: string
  ): TariffsBoxRecord[] {
    return warehouses.map(warehouse => ({
      ...warehouse, 
      date,          
      createdAt: new Date(),
      updatedAt: new Date(),
      boxDeliveryBase: normalizeNumber(warehouse.boxDeliveryBase),
      boxDeliveryCoefExpr: normalizeNumber(warehouse.boxDeliveryCoefExpr),
      boxDeliveryLiter: normalizeNumber(warehouse.boxDeliveryLiter),
      boxDeliveryMarketplaceBase: normalizeNumber(warehouse.boxDeliveryMarketplaceBase),
      boxDeliveryMarketplaceCoefExpr: normalizeNumber(warehouse.boxDeliveryMarketplaceCoefExpr),
      boxDeliveryMarketplaceLiter: normalizeNumber(warehouse.boxDeliveryMarketplaceLiter),
      boxStorageBase: normalizeNumber(warehouse.boxStorageBase),
      boxStorageCoefExpr: normalizeNumber(warehouse.boxStorageCoefExpr),
      boxStorageLiter: normalizeNumber(warehouse.boxStorageLiter)
    }));
  }
}

function normalizeNumber(value: string): string {
  return value.replace(',', '.').replace('-', '0');
}