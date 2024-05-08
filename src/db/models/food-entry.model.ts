import { FoodEntryType } from '../../models';

export interface FoodEntryModel {
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
}
