<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="black" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Alerts</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list class="food-entries__list" v-if="filteredFoodEntries.length">
      <FoodEntryItem
        v-for="entry in filteredFoodEntries"
        :key="entry.id"
        :entry="entry"
        @on-toggle="debounceArchiveToggle($event)"
        @on-delete="onDeleteEntry($event)"
        @on-edit="onEditEntry($event)"
      />
    </ion-list>
  </ion-content>
</template>

<script lang="ts" setup>
  import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, modalController, IonList } from '@ionic/vue';
  import { computed } from 'vue';
  import { useUserStore } from '../store';
  import { debounceArchiveToggle, onDeleteEntry, onEditEntry } from '../services';
  import FoodEntryItem from './FoodEntryItem.vue';

  const userStore = useUserStore();

  const cancel = () => modalController.dismiss(null, 'cancel');
  const confirm = () => modalController.dismiss(null, 'confirm');

  const filteredFoodEntries = computed(() => {
    const currentDate = new Date();
    return userStore.getExpiringFoodEntries.filter((entry) => {
      const expiryDate = new Date(entry.expiryDate);
      return expiryDate <= currentDate || entry.quantity < 20;
    });
  });
</script>
