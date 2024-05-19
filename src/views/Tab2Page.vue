<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ Tabs.BROWSE }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <!-- Shiny new search bar with an input field -->
        <div class="search-bar">
          <ion-toolbar>
            <ion-searchbar v-model="searchTerm" placeholder="Enter recipe or ingredient" slot="start"></ion-searchbar>
          </ion-toolbar>
        </div>

        <div class="food-entries-list">
          <ion-list>
            <ion-item-sliding v-for="entry in filteredData" :key="entry.id">
              <ion-item>
                <ion-icon aria-hidden="true" :icon="fastFoodOutline" color="black"></ion-icon>
                <ion-label class="colorText">
                  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%">
                    <div style="flex: 1">
                      <h2>{{ capitalize(entry.name) }}</h2>
                      <p>{{ capitalize(entry.type) }}</p>
                      <p>Quantity: {{ entry.quantity }} {{ entry.unit_measurement }}</p>
                      <p>Unit Cost: ₱{{ entry.cost }}</p>
                    </div>
                    <div>
                      <p>Stored: {{ formatDate(entry.store_date) }}</p>
                      <p>Expires: {{ formatDate(entry.expiry_date) }}</p>
                    </div>
                  </div>
                </ion-label>
              </ion-item>
              <ion-item-options>
                <ion-item-option color="warning">Edit</ion-item-option>
                <ion-item-option color="danger">Delete</ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItemSliding,
    IonSearchbar,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
  } from '@ionic/vue';
  import { Tabs } from '../models/constants';
  import { createClient } from '@supabase/supabase-js';
  import { fastFoodOutline } from 'ionicons/icons';
  import { capitalize } from 'lodash';

  interface FoodEntry {
    id: number;
    name: string;
    type: string;
    store_date: string;
    expiry_date: string;
    quantity: number;
    unit_measurement: string;
    cost: number;
  }

  const supabaseUrl = 'https://ymyyzgnwopjgsaitbpmn.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteXl6Z253b3BqZ3NhaXRicG1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDc0ODY2OCwiZXhwIjoyMDMwMzI0NjY4fQ.Kzfosz6YLt1QcjsvgpgvFDJZ0t93StjKUe5_i0XaixU';

  const supabase = createClient(supabaseUrl, supabaseKey);

  const data = ref<FoodEntry[]>([]);
  const searchTerm = ref('');

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  const fetchFoodData = async () => {
    try {
      loading.value = true;
      error.value = null;

      const { data: searchDataResult, error: searchError } = await supabase.from('food_entries').select();

      if (searchError) {
        console.error('Error fetching food entries from the database:', searchError.message);
        error.value = 'An error occurred while fetching data.';
      } else {
        data.value = searchDataResult || [];
      }
    } catch (error: any) {
      console.error('Error fetching food entries from the database:', error.message);
      error.value = 'An unexpected error occurred.';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchFoodData();
  });

  const filteredData = computed(() => {
    if (!searchTerm.value.trim()) {
      return data.value;
    }
    const lowerSearchText = searchTerm.value.trim().toLowerCase();
    return data.value.filter((item: FoodEntry) => item.name.toLowerCase().includes(lowerSearchText));
  });
</script>

<style scoped lang="scss">
  .colorText {
    color: #333531;
  }
</style>
