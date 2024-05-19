import { supabase } from '../supabase';
import { IUsageReportForm } from '../models';

export const addUsageReport = async (usageReport: IUsageReportForm) => {
  const { data, error } = await supabase.from('usage_reports').insert([usageReport]);

  if (error) {
    throw new Error(`Error adding usage report: ${error.message}`);
  }
  return data;
};

export const updateFoodEntryQuantity = async (foodId: string, newQuantity: number) => {
  const { data, error } = await supabase.from('food_entries').update({ quantity: newQuantity }).eq('id', foodId);

  if (error) {
    throw new Error(`Error updating food entry quantity: ${error.message}`);
  }
  return data;
};
