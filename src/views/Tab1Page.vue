<template>
  <ion-page>
    <ion-header>
      <!--This is topbar container-->
      <ion-toolbar>
        <section class="topbar-container">
          <!--name section container-->
          <div class="namesec-container">
            <ion-title>{{ Tabs.FOOD_ENTRIES }}</ion-title>
          </div>

          <!-- Icon container-->
          <div class="icon-container">
            <!-- Icon for Edit Profile -->
            <ion-tab-button tab="tab3" href="/edit-profile">
              <ion-icon aria-hidden="true" :icon="personOutline" />
            </ion-tab-button>
          </div>

          <!--logout container-->
          <div class="logout-container">
            <!-- Logout button -->
            <ion-button @click="logout">Logout</ion-button>
          </div>
        </section>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- This is add entry section -->
      <section class="addStyle">
        <!-- This is food name item-->
        <ion-item>
          <ion-label position="fixed">Food Name:</ion-label>
          <ion-input v-model="newEntry.foodName" placeholder="Enter food name here"></ion-input>
        </ion-item>
        <!-- This is type item -->
        <ion-item>
          <ion-label position="fixed">Food Type:</ion-label>
          <ion-select v-model="newEntry.foodType" placeholder="Select Food Type" cancel-text="Cancel">
            <ion-select-option value="perishable">Perishable</ion-select-option>
            <ion-select-option value="processed">Processed</ion-select-option>
          </ion-select>
        </ion-item>
        <!-- This is store date item-->
        <ion-item>
          <ion-label position="fixed">Store Date:</ion-label>
          <ion-input v-model="newEntry.storeDate" type="date" placeholder="Select Date"></ion-input>
        </ion-item>
        <!-- This is expire date item -->
        <ion-item>
          <ion-label position="fixed">Expire Date:</ion-label>
          <ion-input v-model="newEntry.expireDate" type="date" placeholder="Select Date"></ion-input>
        </ion-item>
        <!-- This is add item -->
        <ion-item><ion-button @click="addEntry" slot="end">Add</ion-button></ion-item>
      </section>

      <!-- This is the filter section -->
      <section>
        <ion-item>
          <div class="filter-container">
            <div class="label-container">
              <ion-label class="filter-label"><strong>FOOD LIST</strong></ion-label>
            </div>

            <div class="checkbox-container">
              <ion-checkbox label-placement="start">Perishable</ion-checkbox>
              <ion-checkbox label-placement="start">Processed</ion-checkbox>
            </div>
          </div>
        </ion-item>
      </section>

      <!-- This is the list section -->
      <section>
        <ion-list>
          <ion-item-sliding v-for="(entry, index) in foodEntries" :key="index" class="list-entry">
            <ion-item>
              <ion-label>
                <h2>{{ entry.foodName }}</h2>
                <p>Type: {{ entry.foodType }}</p>
                <p>Store Date: {{ entry.storeDate }}</p>
                <p>Expire Date: {{ entry.expireDate }}</p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option @click="deleteEntry(index)" color="danger">Delete</ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  } from '@ionic/vue';
  import { ref } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  import { Tabs } from '../models/constants';
  import '../assets/saveatStyle.css';
  import { useRouter } from 'vue-router';
  import { IonCheckbox } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { personOutline } from 'ionicons/icons';

  const supabaseUrl = 'https://nzvvuhyqztnxwnwnrbpk.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dnZ1aHlxenRueHdud25yYnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODAyMTksImV4cCI6MjAxMjk1NjIxOX0.rFywbICuv1es8aU7xGRALFhyOrxhTr6r62bxMaR2ads';
  const supabase = createClient(supabaseUrl, supabaseKey);

  interface FoodEntry {
    foodName: string;
    foodType: string;
    storeDate: string;
    expireDate: string;
  }

  const newEntry: FoodEntry = {
    foodName: '',
    foodType: '',
    storeDate: '',
    expireDate: '',
  };

  const foodEntries = ref<Array<FoodEntry>>([]);

  const addEntry = async () => {
    // Insert the new entry into the "Food_Entry" table in Supabase
    console.log('newEntry:', newEntry);
    const { data, error } = await supabase.from('Food_Entry').upsert([newEntry]);

    if (error) {
      console.error('Error adding entry to Supabase:', error);
    } else {
      // Add the new entry to the list
      foodEntries.value.push({ ...newEntry });
      // Clear the form for the next entry
      newEntry.foodName = '';
      newEntry.foodType = '';
      newEntry.storeDate = '';
      newEntry.expireDate = '';
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during sign out:', error);
    } else {
      // Redirect the user to the login page after successful sign out
      window.location.href = '/login';
    }
  };

  const goToEditProfile = () => {
    // Get the router instance
    const router = useRouter();

    // Log the router instance
    console.log(router);

    // Use the router to navigate to the EditProfile page
    router.push('/tabs/edit-profile');
  };

  const deleteEntry = async (index: number) => {
    const entryToDelete = foodEntries.value[index];

    // Remove the entry from the list locally
    foodEntries.value.splice(index, 1);

    // Delete the entry from the "Food_Entry" table in Supabase
    const { error } = await supabase.from('Food_Entry').delete().eq('foodName', entryToDelete.foodName);

    if (error) {
      console.error('Error deleting entry from Supabase:', error);
    }
  };
</script>
