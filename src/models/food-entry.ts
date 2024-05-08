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
}
