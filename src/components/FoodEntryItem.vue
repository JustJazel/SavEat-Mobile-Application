<template lang="">
  <!--START OF SLIDES-->
  <ion-item-sliding class="food-entry-item">
    <!-- List Check Box-->
    <ion-checkbox class="archive-checkbox" slot="start" v-model="entry.isArchived" @ionChange="handleEvent('toggle')"></ion-checkbox>

    <!--Contents of Slides-->
    <ion-item :disabled="entry.isArchived" class="flex-container">
      <ion-icon style="color: #405729" aria-hidden="true" :icon="fastFoodOutline"></ion-icon>
      <ion-label class="flex-grow">
        <h2>{{ capitalize(entry.name) }}</h2>
        <p>{{ capitalize(entry.type) }}</p>
        <p>Stored: {{ formatDate(entry.storeDate) }}</p>
        <p v-if="isExpiring(entry)">Expires: {{ formatDate(entry.expiryDate) }}</p>
        <p v-if="entry.quantity < 20">Quantity: {{ entry.quantity }}</p>
      </ion-label>
      <!--Arrow build here-->
      <ion-icon size="medium" color="black" :icon="arrowForwardOutline"></ion-icon>
    </ion-item>

    <!--When archived-->
    <div class="item--archived" v-if="entry.isArchived">
      <ion-label>Archived</ion-label>
    </div>

    <!--Slide options-->
    <ion-item-options>
      <ion-item-option color="warning" @click="handleEvent('edit')">Edit</ion-item-option>
      <ion-item-option color="danger" @click="handleEvent('delete')">Delete</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
  <!--END OF SLIDES-->
</template>

<script setup lang="ts">
  import { Ref, capitalize, reactive, ref, computed } from 'vue';
  import { IonItem, IonItemSliding, IonCheckbox, IonIcon, IonLabel, IonItemOption, IonItemOptions, toastController } from '@ionic/vue';
  import { fastFoodOutline, arrowForwardOutline } from 'ionicons/icons';
  import { format } from 'date-fns';
  import { IFoodEntry, FoodEntryItemEmitType } from '../models';
  import { deleteFoodEntry } from '../supabase';

  const props = defineProps<{
    entry: IFoodEntry;
  }>();

  const emit = defineEmits<{
    onToggle: [value: IFoodEntry];
    onEdit: [value: IFoodEntry];
    onDelete: [value: IFoodEntry];
  }>();

  function formatDate(date: string) {
    return format(new Date(date), 'MMM dd, yyyy');
  }

  function handleEvent(type: FoodEntryItemEmitType) {
    switch (type) {
      case 'toggle':
        emit('onToggle', props.entry);
        break;
      case 'edit':
        emit('onEdit', props.entry);
        break;
      case 'delete':
        handleDelete();
        break;
      default:
        break;
    }
  }

  function isExpiring(entry: { expiryDate: string | number | Date }) {
    const currentDate = new Date();
    const expiryDate = new Date(entry.expiryDate);
    return expiryDate <= currentDate;
  }

  async function handleDelete() {
    const success = await deleteFoodEntry(props.entry);
    if (success) {
      emit('onDelete', props.entry);
      // Show a toast notification on successful deletion
      const toast = await toastController.create({
        message: 'Deletion successful',
        duration: 2000,
        position: 'top',
      });

      // Apply styles directly to the toast element
      toast.style.setProperty('--background', 'green');
      toast.style.setProperty('--color', 'white');

      await toast.present();
    }
  }
</script>

<style scoped>
  .food-entry-item {
    ion-item {
      position: relative;
      display: flex;
      align-items: center;
      --padding-start: 1rem;

      ion-label {
        margin-left: 1rem;
        flex-grow: 1;
      }
    }

    .archive-checkbox {
      position: absolute;
      top: 1rem;
      left: 1rem;

      --background: #5e823b;
      --border-color: #5e823b;
      --checkmark-color: white;
      --size: 15px; /* Adjust size if needed */
      color: #405729 !important;
      font-weight: lighter;
    }

    .item--archived {
      color: var(--ion-color-warning);
      position: absolute;
      top: 0;
      right: 0;
      font-style: italic;
      padding: 1rem;
    }
  }

  .flex-container {
    display: flex;
    align-items: center;
  }

  .flex-grow {
    flex-grow: 1;
  }
</style>
