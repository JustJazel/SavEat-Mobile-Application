<template>
  <ion-page class="reports">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ Tabs.REPORTS }}</ion-title>
        <ion-item slot="end">
          <ion-button>
            <ion-icon class="black-icon" name="notifications-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-toolbar>

      <!-- Segment Area -->
      <ion-segment v-model="selectedSegment">
        <ion-segment-button value="usageReport" class="usage-report-button">
          <ion-label>Usage Report</ion-label>
        </ion-segment-button>
        <ion-segment-button value="restockReport" class="restock-report-button">
          <ion-label>Restock Report</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Usage Report Form Template -->
      <div v-if="selectedSegment === 'usageReport'">
        <form @submit.prevent="onAddUsageReport">
          <ion-list>
            <!-- Usage Report Date -->
            <ion-item class="food-entries__date-item">
              <ion-label position="stacked">Usage Report Date</ion-label>
              <ion-datetime-button id="store-date-button" datetime="store-datetime"></ion-datetime-button>
              <ion-modal :keep-contents-mounted="true">
                <ion-datetime id="store-datetime" presentation="date-time" v-model="form.report_date"></ion-datetime>
              </ion-modal>
            </ion-item>

            <!-- Search Bar -->
            <ion-item>
              <ion-searchbar v-model="searchQuery" placeholder="Search food..."></ion-searchbar>
            </ion-item>

            <!-- Data Grid -->
            <div class="table-container">
              <ion-grid fixed>
                <ion-row>
                  <ion-col size="3">Name</ion-col>
                  <ion-col size="3">Quantity</ion-col>
                  <ion-col size="3">Amount Used</ion-col>
                  <ion-col size="3">Notes</ion-col>
                </ion-row>
                <ion-row v-for="entry in filteredFoodEntries" :key="entry.id">
                  <ion-col size="3">{{ entry.name }}</ion-col>
                  <ion-col size="3">{{ entry.quantity }} {{ entry.unit_measurement }}</ion-col>
                  <ion-col size="3">
                    <ion-input type="number" v-model="entry.food_usage" placeholder="Enter"></ion-input>
                  </ion-col>
                  <ion-col size="3">
                    <ion-input type="text" v-model="entry.usage_notes" placeholder="Enter"></ion-input>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </div>

            <ion-item>
              <ion-button type="submit" expand="block" :disabled="!isSubmitEnabled">Submit Report</ion-button>
            </ion-item>
          </ion-list>
        </form>

        <ion-label v-if="!userStore.foodEntries.length">No items. Please add entries.</ion-label>

        <!-- Display Usage Reports -->
        <ion-list>
          <ion-item v-for="report in uniqueUsageReports" :key="report.usage_id" @click="openReportDetails(report.usage_id)">
            <ion-label>Usage Report {{ formatDate(report.report_date) }}</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- Restock Report Form Template -->
      <div v-if="selectedSegment === 'restockReport'">
        <form @submit.prevent="onAddRestockReport">
          <ion-list>
            <!-- Restock Report Date -->
            <ion-item class="food-entries__date-item">
              <ion-label position="stacked">Restock Report Date</ion-label>
              <ion-datetime-button id="restock-date-button" datetime="restock-datetime"></ion-datetime-button>
              <ion-modal :keep-contents-mounted="true">
                <ion-datetime id="restock-datetime" presentation="date" v-model="restockForm.restock_date"></ion-datetime>
              </ion-modal>
            </ion-item>

            <!-- Search Bar -->
            <ion-item>
              <ion-searchbar v-model="restockSearchQuery" placeholder="Search food..."></ion-searchbar>
            </ion-item>

            <!-- Data Grid -->
            <div class="table-container">
              <ion-grid fixed>
                <ion-row>
                  <ion-col size="2.2">Name</ion-col>
                  <ion-col size="2.5">Quantity</ion-col>
                  <ion-col size="2.2">Amount Restock</ion-col>
                  <ion-col size="2.2">Total Cost</ion-col>
                  <ion-col size="2.2">Notes</ion-col>
                </ion-row>
                <ion-row v-for="entry in filteredRestockFoodEntries" :key="entry.id">
                  <ion-col size="2.2">{{ entry.name }}</ion-col>
                  <ion-col size="2.2">{{ entry.quantity }} {{ entry.unit_measurement }}</ion-col>
                  <ion-col size="2.2">
                    <ion-input type="number" v-model="entry.restock_amount" placeholder="Enter"></ion-input>
                  </ion-col>
                  <ion-col size="2.2">
                    <ion-input type="number" v-model="entry.total_cost" placeholder="Enter"></ion-input>
                  </ion-col>
                  <ion-col size="2.2">
                    <ion-input type="text" v-model="entry.restock_notes" placeholder="Enter"></ion-input>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </div>

            <ion-item>
              <ion-button type="submit" expand="block" :disabled="!isRestockSubmitEnabled">Submit Report</ion-button>
            </ion-item>
          </ion-list>
        </form>

        <ion-label v-if="!userStore.foodEntries.length">No items. Please add entries.</ion-label>

        <!-- Display Restock Reports -->
        <ion-list>
          <ion-item v-for="report in uniqueRestockReports" :key="report.restock_id" @click="openRestockReportDetails(report.restock_id)">
            <ion-label>Restock Report {{ formatDate(report.restock_date) }}</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- Usage Report Details Modal -->
      <ion-modal :is-open="isModalOpen" @did-dismiss="closeModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Usage Report Details</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item v-for="detail in reportDetails" :key="detail.id">
              <ion-label>
                <h2>{{ detail.name }}</h2>
                <p>Used: {{ detail.food_usage }}</p>
                <p>Notes: {{ detail.usage_notes }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>

      <!-- Restock Report Details Modal -->
      <ion-modal :is-open="isRestockModalOpen" @did-dismiss="closeRestockModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Restock Report Details</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeRestockModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item v-for="detail in restockReportDetails" :key="detail.id">
              <ion-label>
                <h2>{{ detail.name }}</h2>
                <p>Restocked: {{ detail.restock_amount }}</p>
                <p>Total Cost: {{ detail.total_cost }}</p>
                <p>Notes: {{ detail.restock_notes }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
  .black-icon {
    color: black !important;
  }

  .food-entries {
    &__date-item {
      --padding-start: 0;
      padding-left: 1rem;

      ion-datetime-button {
        padding: 10px 0;
      }
    }

    &__filter-header {
      display: block;
      margin-top: 1rem;
      padding: 0 1rem;
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .table-container {
    max-height: 400px;
    overflow-y: auto;
  }

  .food-entries-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .food-entries-table th,
  .food-entries-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .food-entries-table th {
    background-color: #f2f2f2;
    text-align: left;
  }

  .food-entries-table td {
    text-align: center;
  }

  .ion-input {
    max-width: 100px;
    margin: 0 auto;
  }

  // Placeholder text size
  ion-input::part(native)::-webkit-input-placeholder {
    font-size: 10px;

    ion-input::part(native)::-moz-placeholder {
      font-size: 10px;
    }

    ion-input::part(native):-ms-input-placeholder {
      font-size: 10px;
    }

    ion-input::part(native)::-ms-input-placeholder {
      font-size: 10px;
    }

    ion-input::part(native)::placeholder {
      font-size: 10px;
    }

    ion-segment-button.restock-report-button {
      color: #97a48d !important;
      background-color: #d3d8ca;
    }

    //#d3d8ca;
    //#aebf8f;
    ion-segment-button.usage-report-button {
      color: #97a48d !important;
      background-color: #d3d8ca;
    }

    ion-segment-button.restock-report-button.segment-button-checked {
      color: #333531 !important;
      background-color: #d3d8ca !important;
    }

    ion-segment-button.usage-report-button.segment-button-checked {
      color: #333531 !important;
      background-color: #d3d8ca !important;
    }

    .segment-button-checked {
      background-color: #8f9486 !important;
      color: #333531 !important;
    }
  }
</style>

<script setup lang="ts">
  import 'ionicons';

  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonList,
    onIonViewDidEnter,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    IonIcon,
    toastController,
  } from '@ionic/vue';
  import { reactive, ref, computed, watch } from 'vue';
  import shortid from 'shortid';
  import { initFoodEntries, updateFoodEntry, insertUsageReport, insertRestockReport, supabase } from '../../supabase';
  import { useUserStore } from '../../store';
  import { Tabs, IUsageReportForm, IRestockReportForm } from '../../models';
  import { FoodEntryType } from '../../models/food-entry-type.enum';
  import { notifications } from 'ionicons/icons';

  interface UsageReport {
    usage_id: string;
    report_date: string;
    auth_user_id: string;
  }

  interface RestockReport {
    restock_id: string;
    restock_date: string;
    auth_user_id: string;
  }

  interface ReportDetail {
    id: string;
    name: string;
    food_usage: number;
    usage_notes: string;
  }

  interface RestockDetail {
    id: string;
    name: string;
    restock_amount: number;
    total_cost: number;
    restock_notes: string;
  }

  interface IFoodEntry {
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
  }

  interface IFoodEntryExtended extends IFoodEntry {
    food_usage?: number;
    usage_notes?: string;
    restock_amount?: number;
    total_cost?: number;
    restock_notes?: string;
  }

  interface User {
    id: string;
    email: string;
  }

  const userStore = useUserStore();

  // Initialize food entries with restock_amount, total_cost, food_usage, and usage_notes because imports are confusing
  const foodEntries = reactive(
    userStore.foodEntries.map((entry) => ({
      ...entry,
      restock_amount: (entry as IFoodEntryExtended).restock_amount ?? 0,
      total_cost: (entry as IFoodEntryExtended).total_cost ?? 0,
      restock_notes: (entry as IFoodEntryExtended).restock_notes ?? '',
      food_usage: (entry as IFoodEntryExtended).food_usage ?? 0,
      usage_notes: (entry as IFoodEntryExtended).usage_notes ?? '',
    })) as IFoodEntryExtended[],
  );

  const initialForm: IUsageReportForm = {
    report_date: new Date().toISOString(),
    food_id: '',
    food_usage: 0,
    usage_notes: '',
    usage_id: '',
    auth_user_id: '',
  };

  const initialRestockForm: IRestockReportForm = {
    restock_date: new Date().toISOString(), // Ensure restock_date is set initially
    food_id: '',
    restock_amount: 0,
    total_cost: 0,
    restock_notes: '',
    restock_id: '',
    auth_user_id: '',
  };

  const form = reactive({ ...initialForm });
  const restockForm = reactive({ ...initialRestockForm });
  const searchQuery = ref<string>('');
  const restockSearchQuery = ref<string>('');

  const selectedSegment = ref('usageReport');
  const uniqueUsageReports = ref<UsageReport[]>([]);
  const uniqueRestockReports = ref<RestockReport[]>([]);
  const reportDetails = ref<ReportDetail[]>([]);
  const restockReportDetails = ref<RestockDetail[]>([]);
  const isModalOpen = ref(false);
  const isRestockModalOpen = ref(false);
  const currentUser = ref<User | null>(null); // Ensure the type can be User or null

  onIonViewDidEnter(async () => {
    await initFoodEntries();
    await fetchUniqueUsageReports();
    await fetchUniqueRestockReports();
    currentUser.value = await getCurrentUser();
  });

  const filteredFoodEntries = computed(() => {
    if (!searchQuery.value) {
      return foodEntries;
    }
    return foodEntries.filter((entry) => entry.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  const filteredRestockFoodEntries = computed(() => {
    if (!restockSearchQuery.value) {
      return foodEntries;
    }
    return foodEntries.filter((entry) => entry.name.toLowerCase().includes(restockSearchQuery.value.toLowerCase()));
  });

  const onDateChange = (event: any) => {
    form.report_date = event.target.value;
  };

  const isSubmitEnabled = computed(() => {
    return foodEntries.some((entry) => entry.food_usage! > 0);
  });

  const isRestockSubmitEnabled = computed(() => {
    return foodEntries.some((entry) => entry.restock_amount! > 0);
  });

  const getCurrentUser = async (): Promise<User | null> => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.error('Error fetching user:', error);
      return null;
    }
    return user.user as User;
  };

  const fetchUniqueUsageReports = async () => {
    const user = await getCurrentUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('usage_report')
      .select('usage_id, report_date, auth_user_id')
      .eq('auth_user_id', user.id)
      .order('report_date', { ascending: false });

    if (error) {
      console.error('Error fetching usage reports:', error);
      return;
    }

    const reports = data as UsageReport[];
    const uniqueReports = reports.reduce((acc: UsageReport[], report: UsageReport) => {
      if (!acc.some((r) => r.usage_id === report.usage_id)) {
        acc.push(report);
      }
      return acc;
    }, []);

    uniqueUsageReports.value = uniqueReports;
  };

  const fetchUniqueRestockReports = async () => {
    const user = await getCurrentUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('restock_report')
      .select('restock_id, restock_date, auth_user_id')
      .eq('auth_user_id', user.id)
      .order('restock_date', { ascending: false });

    if (error) {
      console.error('Error fetching restock reports:', error);
      return;
    }

    const reports = data as RestockReport[];
    const uniqueReports = reports.reduce((acc: RestockReport[], report: RestockReport) => {
      if (!acc.some((r) => r.restock_id === report.restock_id)) {
        acc.push(report);
      }
      return acc;
    }, []);

    uniqueRestockReports.value = uniqueReports;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const openReportDetails = async (usageId: string) => {
    const { data, error } = await supabase.from('usage_report').select('id, food_id, food_usage, usage_notes').eq('usage_id', usageId);

    if (error) {
      console.error('Error fetching report details:', error);
      return;
    }

    const details = data.map((detail: any) => ({
      id: detail.id,
      name: foodEntries.find((entry) => entry.id === detail.food_id)?.name || 'Unknown',
      food_usage: detail.food_usage,
      usage_notes: detail.usage_notes,
    }));

    reportDetails.value = details;
    isModalOpen.value = true;
  };

  const openRestockReportDetails = async (restockId: string) => {
    const { data, error } = await supabase
      .from('restock_report')
      .select('id, food_id, restock_amount, total_cost, restock_notes')
      .eq('restock_id', restockId);

    if (error) {
      console.error('Error fetching report details:', error);
      return;
    }

    const details = data.map((detail: any) => ({
      id: detail.id,
      name: foodEntries.find((entry) => entry.id === detail.food_id)?.name || 'Unknown',
      restock_amount: detail.restock_amount,
      total_cost: detail.total_cost,
      restock_notes: detail.restock_notes,
    }));

    restockReportDetails.value = details;
    isRestockModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const closeRestockModal = () => {
    isRestockModalOpen.value = false;
  };

  const onAddUsageReport = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        const toast = await toastController.create({
          message: 'User not authenticated',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
        return;
      }

      const auth_user_id = user.id;
      const usageId = shortid.generate();

      // Use the date from form.report_date
      const report_date = form.report_date ? new Date(form.report_date).toISOString() : new Date().toISOString();

      const usageReports = foodEntries
        .filter((entry) => entry.food_usage! > 0 && entry.food_usage !== null)
        .map((entry) => {
          if (entry.food_usage! > entry.quantity) {
            throw new Error(`Usage amount for ${entry.name} exceeds available quantity.`);
          }
          return {
            usage_id: usageId,
            report_date,
            food_id: entry.id,
            food_usage: entry.food_usage!,
            usage_notes: entry.usage_notes!,
            auth_user_id,
          };
        });

      await Promise.all(
        usageReports.map(async (report) => {
          await insertUsageReport(report);

          const foodEntry = foodEntries.find((entry) => entry.id === report.food_id);
          if (foodEntry) {
            foodEntry.quantity -= report.food_usage;
            await updateFoodEntry(foodEntry);
          }
        }),
      );

      // Reset usage and notes, but not the date because the date get set to null and now you can't add a new report
      foodEntries.forEach((entry) => {
        entry.food_usage = 0;
        entry.usage_notes = '';
      });

      const toast = await toastController.create({
        message: 'Usage report submitted successfully.',
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      await toast.present();
      fetchUniqueUsageReports();
    } catch (error) {
      console.error('Error adding usage report:', error);
      const toast = await toastController.create({
        message: `Failed to submit usage report`,
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
  };

  const onAddRestockReport = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        const toast = await toastController.create({
          message: 'User not authenticated',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
        return;
      }

      const auth_user_id = user.id;
      const restockId = shortid.generate();

      // Use the date from restockForm.restock_date to set the date because it refuses to set on pageload
      const restock_date = restockForm.restock_date ? new Date(restockForm.restock_date).toISOString() : new Date().toISOString();

      const restockReports = foodEntries
        .filter((entry) => entry.restock_amount! > 0)
        .map((entry) => {
          if (entry.total_cost! <= 0) {
            throw new Error(`Total cost for ${entry.name} cannot be zero or negative.`);
          }
          return {
            restock_id: restockId,
            restock_date,
            food_id: entry.id,
            restock_amount: Number(entry.restock_amount),
            total_cost: Number(entry.total_cost),
            restock_notes: entry.restock_notes!,
            auth_user_id,
          };
        });

      await Promise.all(
        restockReports.map(async (report) => {
          await insertRestockReport(report);

          const foodEntry = foodEntries.find((entry) => entry.id === report.food_id);
          if (foodEntry) {
            foodEntry.quantity += Number(report.restock_amount);
            await updateFoodEntry(foodEntry);
          }
        }),
      );

      // Reset restock and notes because it we reset the date, it will go null and the now you can no longer make a new report
      foodEntries.forEach((entry) => {
        entry.restock_amount = 0;
        entry.total_cost = 0;
        entry.restock_notes = '';
      });

      const toast = await toastController.create({
        message: 'Restock report submitted successfully.',
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      await toast.present();
      fetchUniqueRestockReports();
    } catch (error) {
      console.error('Error adding restock report:', error);
      const toast = await toastController.create({
        message: `Failed to submit restock report`,
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
  };

  // Watch for changes in foodEntries to update the submit button state
  watch(
    () => foodEntries.map((entry) => entry.food_usage),
    () => {
      /* This forces the computed property to re-evaluate */
    },
  );

  watch(
    () => foodEntries.map((entry) => entry.restock_amount),
    () => {
      /* This forces the computed property to re-evaluate */
    },
  );
</script>
