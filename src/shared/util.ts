import { FoodEntryModel } from '../db/models';
import { IFoodEntry } from '../models';

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
  };
}

export function convertToAppModelsList(foodEntries: FoodEntryModel[]): IFoodEntry[] {
  return foodEntries.map((foodEntry) => convertToAppModel(foodEntry));
}
