import { IFoodEntry, IUsageReportForm } from '../models';
import {
  deleteFoodEntry as deleteEntry,
  insertFoodEntry as insertEntry,
  updateFoodEntry as updateEntry,
  insertUsageReport as insertReport,
} from '../supabase';
import { format, isAfter, isEqual } from 'date-fns';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { parseISO, addDays } from 'date-fns';

export interface IUser {
  uuid: string;
  email?: string;
  firstName: string;
  lastName: string;
}

interface State {
  user: IUser | null;
  foodEntries: IFoodEntry[];
  selectedFoodEntry: IFoodEntry | null;
  expiringFoodEntries: IFoodEntry[];
  usageReports: IUsageReportForm[]; // Add this line
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    user: null,
    foodEntries: [],
    selectedFoodEntry: null,
    expiringFoodEntries: [],
    usageReports: [],
  }),
  getters: {
    getUser(): IUser | null {
      return this.user;
    },
    getFoodEntries(): IFoodEntry[] {
      return this.foodEntries;
    },
    getCurrentState(state): State {
      return state;
    },
    getExpiringFoodEntries(): IFoodEntry[] {
      return this.expiringFoodEntries;
    },
    getUserFullName(): string {
      if (!this.user) {
        return 'Guest';
      }

      return `${this.user?.firstName} ${this.user?.lastName}`;
    },
  },
  actions: {
    setUser(user: IUser): void {
      this.user = user;
    },
    setFoodEntries(foodEntries: IFoodEntry[]): void {
      this.foodEntries = foodEntries;
    },
    setExpiringFoodEntries(): void {
      if (!this.foodEntries.length) {
        return;
      }

      const today = new Date();
      const filteredEntries = this.foodEntries.filter((entry) => {
        const expiryDate = parseISO(entry.expiryDate);
        const offsetExpiryDate = addDays(today, 3);

        return isAfter(offsetExpiryDate, expiryDate) || isEqual(offsetExpiryDate, expiryDate);
      });

      this.expiringFoodEntries = filteredEntries;
    },
    async addFoodEntry(foodEntry: IFoodEntry): Promise<void> {
      foodEntry = {
        ...foodEntry,
        authUserId: this.user?.uuid,
        createAt: format(new Date(), 'yyyy-MM-dd'),
        id: uuidv4(),
      };
      const res: IFoodEntry | null = await insertEntry(foodEntry);

      if (!res) {
        return;
      }

      this.foodEntries.push(res);
    },
    async updateFoodEntry(foodEntry: IFoodEntry): Promise<boolean> {
      const res = await updateEntry(foodEntry);

      if (!res) {
        return false;
      }

      this.foodEntries = this.foodEntries.map((entry) => {
        if (entry.id === foodEntry.id) {
          return foodEntry;
        }

        return entry;
      });

      return true;
    },
    async removeFoodEntry(foodEntry: IFoodEntry): Promise<boolean> {
      const res = await deleteEntry(foodEntry);

      if (!res) {
        return false;
      }

      this.foodEntries = this.foodEntries.filter((entry) => entry.id !== foodEntry.id);

      return res;
    },
    async updateFoodEntryQuantity(foodEntryId: string, newQuantity: number): Promise<void> {
      const foodEntry = this.foodEntries.find((entry) => entry.id === foodEntryId);
      if (foodEntry) {
        foodEntry.quantity = newQuantity;
        await this.updateFoodEntry(foodEntry);
      }
    },
    async addUsageReport(usageReport: IUsageReportForm): Promise<void> {
      const res = await insertReport(usageReport);
      if (res) {
        this.usageReports.push(usageReport);
      }
    },
  },
});
