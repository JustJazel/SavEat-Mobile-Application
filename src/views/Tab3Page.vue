<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title :class="titleClass">{{ Tabs.SUGGESTIONS }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" :class="titleClass">{{ Tabs.SUGGESTIONS }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- New Search Bar with Button -->
      <ion-toolbar>
        <ion-searchbar v-model="searchText" placeholder="Enter recipe here" slot="start"></ion-searchbar>
        <ion-button slot="end" @click="search" class="searchButton">Search</ion-button>
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
      <ion-grid v-if="selectedItemDetails">
        <!-- Title -->
        <h2 class="title" :class="titleClass">{{ selectedItemDetails.title }}</h2>
        <!-- Summary -->
        <p v-html="selectedItemDetails.summary" class="summary" ref="summary"></p>
        <!-- Image -->
        <img :src="selectedItemDetails.image" alt="Recipe image" class="image" />
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonSearchbar } from '@ionic/vue';
  import { Tabs } from '../models/constants';
  import { ref, watch } from 'vue';
  import axios from 'axios'; // api integration

  const searchText = ref<string>('');
  const filteredData = ref<Array<{ id: number; data: string }>>([]);
  const selectedItem = ref<{ id: number; data: string } | null>(null);
  const selectedItemDetails = ref<{ title: string; summary: string; image: string } | null>(null);
  const summaryRef = ref<HTMLElement | null>(null);

  const titleClass = 'black-title'; // Add this line to bind the class

  const search = async () => {
    try {
      const API_KEY = 'c216fd7a62904480bb2104579d6e24ec';
      const query = searchText.value;
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);
      filteredData.value = response.data.results.slice(0, 5).map((result: { id: number; title: string }) => ({
        id: result.id,
        data: result.title,
      }));
      selectedItem.value = null;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (item: { id: number; data: string }) => {
    try {
      const API_KEY = 'c216fd7a62904480bb2104579d6e24ec';
      const response = await axios.get(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${API_KEY}`);
      selectedItemDetails.value = {
        title: response.data.title,
        summary: response.data.summary,
        image: response.data.image,
      };
      applyLinkStyles();
    } catch (error) {
      console.error(error);
    }
  };

  const applyLinkStyles = () => {
    if (summaryRef.value) {
      const links = summaryRef.value.querySelectorAll('a');
      links.forEach((link) => {
        link.style.color = 'blue';
        link.style.textDecoration = 'underline';
      });
    }
  };

  watch(selectedItemDetails, applyLinkStyles);
</script>

<style scoped>
  .black-title {
    color: black;
  }

  .ion-page .summary a {
    color: blue !important; /* Force the link color to blue */
    text-decoration: underline !important; /* Ensure underline is applied */
  }

  .searchButton {
    --color: white; /* Change the text color to white */
    --background: #333531; /* Change the background color (optional) */
  }

  .dark-green-cell {
    background-color: #e3e5e1;
    color: #405729;
    border: 1px solid #405729;
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

  .title {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    text-align: center;
    font-weight: bold;
  }

  .summary {
    font-size: 1.1em;
    line-height: 1.6;
    margin: 0 1em 1em 1em;
    text-align: justify;
  }

  .image {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0.5em auto;
    border-radius: 10px;
  }
</style>
