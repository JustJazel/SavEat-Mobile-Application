<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="black" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Edit Food Entry</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item :disabled="form.isArchived">
        <ion-input
          label="Add an entry: "
          placeholder="Apples or Oranges, you name it..."
          label-placement="stacked"
          v-model="form.name"
        ></ion-input>
      </ion-item>
      <ion-item :disabled="form.isArchived">
        <FoodTypePicker @change="onFoodTypeChanges($event)" :type="form.type" />
      </ion-item>
      <!-- Store Date -->
      <ion-item class="food-entries__date-item" :disabled="form.isArchived">
        <ion-label position="stacked">Store Date</ion-label>
        <ion-datetime-button datetime="store-modal-datetime"></ion-datetime-button>
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime id="store-modal-datetime" presentation="date" v-model="form.storeDate"></ion-datetime>
        </ion-modal>
      </ion-item>
      <!-- Expiry Date -->
      <ion-item class="food-entries__date-item" :disabled="form.isArchived">
        <ion-label position="stacked">Expiry Date</ion-label>
        <ion-datetime-button datetime="expiry-modal-datetime"></ion-datetime-button>
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime id="expiry-modal-datetime" presentation="date" :min="form.storeDate" v-model="form.expiryDate"></ion-datetime>
        </ion-modal>
      </ion-item>
      <!-- Food Description -->
      <ion-item :disabled="form.isArchived">
        <ion-label position="stacked">Description</ion-label>
        <ion-input type="text" v-model="form.food_description"></ion-input>
      </ion-item>
      <!-- Food Quantity -->
      <ion-item :disabled="form.isArchived">
        <ion-label position="stacked">Quantity</ion-label>
        <ion-input type="number" v-model="form.quantity"></ion-input>
      </ion-item>
      <!-- Food Cost -->
      <ion-item :disabled="form.isArchived">
        <ion-label position="stacked">Cost</ion-label>
        <ion-input type="number" v-model="form.cost"></ion-input>
      </ion-item>
      <!-- Unit Measurement -->
      <ion-item :disabled="form.isArchived">
        <ion-label position="stacked">Unit Measurement</ion-label>
        <ion-select v-model="form.unit_measurement" interface="popover">
          <ion-select-option value="pieces">Pieces</ion-select-option>
          <ion-select-option value="kg">Kg</ion-select-option>
          <ion-select-option value="ml">Ml</ion-select-option>
          <ion-select-option value="l">L</ion-select-option>
          <ion-select-option value="g">G</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Archived</ion-label>
        <ion-checkbox v-model="form.isArchived" label-placement="start"></ion-checkbox>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    modalController,
    IonModal,
    IonList,
    IonLabel,
    IonDatetime,
    IonDatetimeButton,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
  } from '@ionic/vue';
  import { FoodEntryType } from '../models';
  import FoodTypePicker from './FoodTypePicker.vue';
  import { IFoodEntryForm } from '../models';
  import { updateFoodEntry } from '../supabase';

  const props = defineProps<{
    form: IFoodEntryForm;
  }>();

  const emit = defineEmits<{
    (event: 'confirm', form: IFoodEntryForm): void;
    (event: 'cancel'): void;
  }>();

  function onFoodTypeChanges(type: FoodEntryType) {
    props.form.type = type;
  }

  const cancel = () => {
    modalController.dismiss(null, 'cancel');
    emit('cancel');
  };

  const confirm = async () => {
    try {
      // Call the update service
      await updateFoodEntry(props.form);

      // Close the modal and return the updated form data
      modalController.dismiss(props.form, 'confirm');
      emit('confirm', props.form);
    } catch (error) {
      console.error('Failed to update food entry:', error);
    }
  };
</script>
