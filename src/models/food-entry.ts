import { FoodEntryType } from './food-entry-type.enum';

export interface IFoodEntry {
  id: string;
  name: string;
  createAt?: string;
  authUserId?: string;
  type: FoodEntryType;
  storeDate: string;
  expiryDate: string;
  isArchived: boolean;
  quantity: number;
  cost: number;
  food_description: string;
  unit_measurement: string;

  food_usage: number;
  usage_notes: string;
  restock_amount?: number;
  total_cost?: number;
  restock_notes?: string;
}

export interface IUsageReportForm {
  id?: string;
  usage_id: string;
  report_date: string;
  food_id: string;
  food_usage: number;
  usage_notes: string;
  auth_user_id: string;
}

export interface IRestockReportForm {
  id?: string;
  restock_id: string;
  restock_date: string;
  food_id: string;
  restock_amount: number;
  restock_notes: string;
  auth_user_id: string;
  total_cost: number;
}
