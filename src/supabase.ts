import { createClient } from '@supabase/supabase-js';
import { useUserStore } from './store';
import { FoodEntryModel } from './db/models';
import { convertToAppModel, convertToAppModelsList, convertToDbModel } from './shared/util';
import { IFoodEntry } from './models';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Read/Fetch Food Entries
export async function initFoodEntries() {
  const userStore = useUserStore();
  const { data, error } = await supabase.from('food_entries').select('*');

  if (error) {
    console.log('initFoodEntries ~ error:', error);
    return;
  }

  if (data) {
    const mappedFoodEntries = convertToAppModelsList(data as FoodEntryModel[]);

    userStore.setFoodEntries(mappedFoodEntries);
    userStore.setExpiringFoodEntries();
  }
}

// Create Food Entry
export async function insertFoodEntry(foodEntry: IFoodEntry): Promise<IFoodEntry | null> {
  const dbModel = convertToDbModel(foodEntry);

  const { data, error } = await supabase.from('food_entries').insert([dbModel]).select();

  if (error) {
    console.log('addFoodEntry ~ error:', error);
    return null;
  }

  if (data) {
    return convertToAppModel(data[0] as FoodEntryModel);
  }

  return null;
}

// Update Food Entry
export async function updateFoodEntry(foodEntry: IFoodEntry): Promise<IFoodEntry | null> {
  const dbModel = convertToDbModel(foodEntry);

  const { data, error } = await supabase.from('food_entries').update(dbModel).eq('id', foodEntry.id).select();

  if (error) {
    console.log('updateFoodEntry ~ error:', error);
    return null;
  }

  if (data) {
    return convertToAppModel(data[0] as FoodEntryModel);
  }

  return null;
}

// Delete Food Entry
export async function deleteFoodEntry(foodEntry: IFoodEntry): Promise<boolean> {
  const { error } = await supabase.from('food_entries').delete().eq('id', foodEntry.id);

  if (error) {
    console.log('deleteFoodEntry ~ error:', error);
    return false;
  }

  return true;
}
