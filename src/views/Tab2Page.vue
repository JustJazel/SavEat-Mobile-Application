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
          <input
            class="search-box"
            v-model="searchTerm"
            placeholder="Search food entry by name..."
            style="width: 100%; height: 50px; background-color: rgb(115, 209, 156); border: 3px solid #1e5a33"
          />

          <!--    <p>
            <ion-checkbox></ion-checkbox>
            Used
            <ion-checkbox></ion-checkbox>
            Perishable
            <ion-checkbox></ion-checkbox>
            Processed
          </p>-->
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
  import { ref, computed, Ref, watch, onMounted } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItemSliding } from '@ionic/vue';
  import { Tabs } from '../models/constants';
  import { createClient } from '@supabase/supabase-js';
  import { fastFoodOutline } from 'ionicons/icons';
  import { capitalize } from 'vue';

  const showProcessed: Ref<boolean> = ref(false);
  const showPerishable: Ref<boolean> = ref(false);

  interface FoodEntry {
    id: number;
    name: string;
    type: string;
    store_date: string;
    expiry_date: string;
  }

  const supabaseUrl = 'https://xcspnnmswynkoibswxyw.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhjc3Bubm1zd3lua29pYnN3eHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODQxNjQsImV4cCI6MjAxNjE2MDE2NH0.ho4mMmPxIheFu4QoE5f_hg4E69af-cCQL41QsAAb1R4';

  const supabase = createClient(supabaseUrl, supabaseKey);

  const data: Ref<FoodEntry[]> = ref([]);
  const searchTerm = ref('');

  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref('');

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  const fetchFoodData = async () => {
    try {
      loading.value = true;
      error.value = null;

      const query = supabase.from('food_entries').select();

      if (searchTerm.value.trim()) {
        query.ilike('name', `%${searchTerm.value.trim().toLowerCase()}%`);
      }

      const { data: searchDataResult, error: searchError } = await query;

      console.log('Search Data:', searchDataResult);

      if (searchError) {
        console.error('Error searching in the database:', searchError.message);
        error.value = 'An error occurred while searching.';
      } else {
        data.value = searchDataResult || [];
      }
    } catch (error: any) {
      console.error('Error searching in the database:', error.message);
      error.value = 'An unexpected error occurred.';
    } finally {
      loading.value = false;
      console.log('Search Complete');
    }
  };

  watch(searchTerm, () => {
    fetchFoodData();
  });

  const filteredData = computed(() => {
    const lowerSearchText = searchTerm.value.trim().toLowerCase();

    if (!lowerSearchText) {
      return data.value.filter(
        (item: FoodEntry) =>
          (showProcessed.value ? item.type.toLowerCase() === 'processed' : true) &&
          (showPerishable.value ? item.type.toLowerCase() === 'perishable' : true),
      );
    }

    return data.value.filter(
      (item: FoodEntry) =>
        item.name.toLowerCase().includes(lowerSearchText) &&
        (showProcessed.value ? item.type.toLowerCase() === 'processed' : true) &&
        (showPerishable.value ? item.type.toLowerCase() === 'perishable' : true),
    );
  });

  onMounted(() => {
    fetchFoodData();
  });
</script>
