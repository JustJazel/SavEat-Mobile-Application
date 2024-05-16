import { FoodEntryType } from './food-entry-type.enum';

export interface IFoodEntryForm {
  name: string;
  type: FoodEntryType;
  storeDate: string;
  expiryDate: string;
  isArchived: boolean;
  quantity: number;
  cost: number;
  food_description: string;
  unit_measurement: string;
}
