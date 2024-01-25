import { FoodEntryType } from '../models';

export interface IFoodEntryFilterType {
  name: string;
  value: FoodEntryType;
  checked: boolean;
}
