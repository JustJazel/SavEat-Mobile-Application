<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Edit Food Entry</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item :disabled="props.form.isArchived">
        <ion-input
          label="Add an entry: "
          placeholder="Apples or Oranges, you name it..."
          label-placement="stacked"
          v-model="props.form.name"
        ></ion-input>
      </ion-item>
      <ion-item :disabled="props.form.isArchived">
        <FoodTypePicker @change="onFoodTypeChanges($event)" :type="props.form.type" />
      </ion-item>
      <!-- Store Date -->
      <ion-item class="food-entries__date-item" :disabled="props.form.isArchived">
        <ion-label position="stacked">Store Date</ion-label>
        <ion-datetime-button datetime="store-modal-datetime"></ion-datetime-button>
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime id="store-modal-datetime" presentation="date" v-model="props.form.storeDate"></ion-datetime>
        </ion-modal>
      </ion-item>
      <!-- Expiry Date -->
      <ion-item class="food-entries__date-item" :disabled="props.form.isArchived">
        <ion-label position="stacked">Expiry Date</ion-label>
        <ion-datetime-button datetime="expiry-modal-datetime"></ion-datetime-button>
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            id="expiry-modal-datetime"
            presentation="date"
            :min="props.form.storeDate"
            v-model="props.form.expiryDate"
          ></ion-datetime>
        </ion-modal>
      </ion-item>
      <ion-item>
        <ion-label>Archived</ion-label>
        <ion-checkbox v-model="props.form.isArchived" label-placement="start"></ion-checkbox>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts" setup>
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
  } from '@ionic/vue';
  import { FoodEntryType } from '../models';
  import FoodTypePicker from './FoodTypePicker.vue';
  import { IFoodEntryForm } from '../models';

  const props = defineProps<{
    form: IFoodEntryForm;
  }>();

  function onFoodTypeChanges(type: FoodEntryType) {
    props.form.type = type;
  }

  const cancel = () => modalController.dismiss(null, 'cancel');
  const confirm = () => modalController.dismiss(props.form, 'confirm');
</script>
