import { FoodEntryModel, UsageReportModel, RestockReportModel } from '../db/models';
import { IFoodEntry, IUsageReportForm, IRestockReportForm } from '../models';

export function convertToDbModel(foodEntry: IFoodEntry): FoodEntryModel {
  return {
    auth_user_id: foodEntry.authUserId!,
    created_at: foodEntry.createAt!,
    expiry_date: foodEntry.expiryDate!,
    id: foodEntry.id,
    name: foodEntry.name!,
    store_date: foodEntry.storeDate!,
    type: foodEntry.type,
    is_archived: foodEntry.isArchived,
    quantity: foodEntry.quantity,
    cost: foodEntry.cost,
    food_description: foodEntry.food_description,
    unit_measurement: foodEntry.unit_measurement,
    food_usage: foodEntry.food_usage,
    usage_notes: foodEntry.usage_notes,
  };
}

export function convertToAppModel(foodEntry: FoodEntryModel): IFoodEntry {
  return {
    authUserId: foodEntry.auth_user_id,
    createAt: foodEntry.created_at,
    expiryDate: foodEntry.expiry_date,
    id: foodEntry.id,
    name: foodEntry.name,
    storeDate: foodEntry.store_date,
    type: foodEntry.type,
    isArchived: foodEntry.is_archived,
    quantity: foodEntry.quantity,
    cost: foodEntry.cost,
    food_description: foodEntry.food_description,
    unit_measurement: foodEntry.unit_measurement,
    food_usage: foodEntry.food_usage,
    usage_notes: foodEntry.usage_notes,
  };
}

export function convertToAppModelsList(foodEntries: FoodEntryModel[]): IFoodEntry[] {
  return foodEntries.map((foodEntry) => convertToAppModel(foodEntry));
}

export function convertUsageReportToDbModel(usageReport: IUsageReportForm): UsageReportModel {
  return {
    id: usageReport.id,
    report_date: usageReport.report_date,
    food_id: usageReport.food_id,
    food_usage: usageReport.food_usage,
    usage_notes: usageReport.usage_notes,
    auth_user_id: usageReport.auth_user_id,
    usage_id: usageReport.usage_id,
  };
}

export function convertUsageReportToAppModel(usageReport: UsageReportModel): IUsageReportForm {
  return {
    id: usageReport.id,
    report_date: usageReport.report_date,
    food_id: usageReport.food_id,
    food_usage: usageReport.food_usage,
    usage_notes: usageReport.usage_notes,
    usage_id: usageReport.usage_id,
    auth_user_id: usageReport.auth_user_id,
  };
}

export function convertUsageReportsToAppModelsList(usageReports: UsageReportModel[]): IUsageReportForm[] {
  return usageReports.map((usageReport) => convertUsageReportToAppModel(usageReport));
}

export function convertRestockReportToDbModel(restockReport: IRestockReportForm): RestockReportModel {
  return {
    id: restockReport.id,
    restock_id: restockReport.restock_id,
    restock_date: restockReport.restock_date,
    food_id: restockReport.food_id,
    total_cost: restockReport.total_cost,
    restock_notes: restockReport.restock_notes,
    restock_amount: restockReport.restock_amount,
    auth_user_id: restockReport.auth_user_id,
  };
}

export function convertRestockReportToAppModel(restockReport: RestockReportModel): IRestockReportForm {
  return {
    auth_user_id: restockReport.auth_user_id,
    restock_id: restockReport.restock_id,
    restock_date: restockReport.restock_date,
    food_id: restockReport.food_id,
    total_cost: restockReport.total_cost,
    restock_notes: restockReport.restock_notes,
    id: restockReport.id,
    restock_amount: restockReport.restock_amount,
  };
}

export function convertRestockReportsToAppModelsList(restockReports: RestockReportModel[]): IRestockReportForm[] {
  return restockReports.map((restockReport) => convertRestockReportToAppModel(restockReport));
}
