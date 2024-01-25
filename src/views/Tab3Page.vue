<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ Tabs.SUGGESTIONS }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ Tabs.SUGGESTIONS }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- New Search Bar with Button -->
      <ion-toolbar>
        <ion-searchbar v-model="searchText" placeholder="Enter recipe or ingredient" slot="start"></ion-searchbar>
        <ion-button style="background-color: rgb(143, 190, 166)" fill="outline" slot="end" @click="search">Search</ion-button>
      </ion-toolbar>

      <!-- Data Grid -->
      <div class="data-grid">
        <ion-grid>
          <ion-row v-for="item in filteredData" :key="item.id" class="dark-green-cell" @click="handleClick(item)">
            <ion-col>
              {{ item.data }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Display selected item details -->
      <ion-grid v-if="selectedItemDetails" class="item-details">
        <!-- Title -->
        <h2>{{ selectedItemDetails.title }}</h2>
        <!-- Summary -->
        <p v-html="selectedItemDetails.summary"></p>
        <!-- Image -->
        <img :src="selectedItemDetails.image" alt="Recipe image" />
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonSearchbar } from '@ionic/vue';
  import { Tabs } from '../models/constants';
  import { ref } from 'vue';
  import axios from 'axios'; // api integration

  // Search text
  const searchText = ref<string>('');
  // Filtered data based on search
  const filteredData = ref<Array<{ id: number; data: string }>>([]);
  // Selected item details
  const selectedItem = ref<{ id: number; data: string } | null>(null);
  const selectedItemDetails = ref<{ title: string; summary: string; image: string } | null>(null);
  const search = async () => {
    try {
      // Your Spoonacular API Key
      const API_KEY = 'c216fd7a62904480bb2104579d6e24ec';

      const query = searchText.value;

      // Make a GET request to the Spoonacular API
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);

      // Update filteredData with the response data
      filteredData.value = response.data.results.slice(0, 5).map((result: { id: number; title: string }) => ({
        id: result.id,
        data: result.title,
      }));

      // Reset selected item when new search is performed
      selectedItem.value = null;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (item: { id: number; data: string }) => {
    try {
      // Your Spoonacular API Key
      const API_KEY = 'c216fd7a62904480bb2104579d6e24ec';

      // Make a GET request to the Spoonacular API to fetch details of the clicked item
      const response = await axios.get(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${API_KEY}`);

      let summary = response.data.summary;

      selectedItemDetails.value = {
        title: response.data.title,
        summary: summary,
        image: response.data.image,
      };
    } catch (error) {
      console.error(error);
    }
  };
</script>

<style scoped>
  ion-button {
    &.button-button-outline {
      --background: rgb(157, 231, 194);
      color: white;
    }
  }

  .dark-green-cell {
    background-color: rgb(157, 231, 194);
    color: rgb(0, 0, 0);
    border: 1px solid #000000;
    box-shadow: 0px 0px 5px 0px black;
    border-radius: 5px;
    margin: 2px;
  }

  .item-details {
    margin: 6px;
    padding: 1rem;
    background-color: rgb(157, 231, 194);
    border: 2px solid black;
    border-radius: 8px;
    line-height: 1.5;
  }

  .item-details h2 {
    margin-bottom: 10px;
  }

  .item-details p {
    margin-bottom: 20px;
  }
</style>
