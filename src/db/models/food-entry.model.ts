import { FoodEntryType } from '../../models';

export interface FoodEntryModel {
  unit_measurement: string;
  food_description: string;
  cost: number;
  quantity: number;
  auth_user_id: string;
  created_at: string;
  expiry_date: string;
  id: string;
  name: string;
  store_date: string;
  type: FoodEntryType;
  is_archived: boolean;
  food_usage: number;
  usage_notes: string;
}

export interface UsageReportModel {
  id: string | undefined;
  report_date: string;
  food_id: string;
  food_usage: number;
  usage_notes: string;
  usage_id: string;
  auth_user_id: string;
}

export interface RestockReportModel {
  restock_id: string;
  auth_user_id: string;
  id: string | undefined;
  restock_date: string;
  restock_amount: number;
  food_id: string;
  restock_notes: string;
  total_cost: number;
}
