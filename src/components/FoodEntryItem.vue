<template lang="">
  <ion-item-sliding class="food-entry-item">
    <ion-checkbox class="archive-checkbox" slot="start" v-model="entry.isArchived" @ionChange="handleEvent('toggle')"></ion-checkbox>

    <ion-item :disabled="entry.isArchived">
      <ion-icon aria-hidden="true" :icon="fastFoodOutline"></ion-icon>
      <ion-label>
        <h2>{{ capitalize(entry.name) }}</h2>
        <p>{{ capitalize(entry.type) }}</p>
        <p>Stored: {{ formatDate(entry.storeDate) }}</p>
        <p>Expires: {{ formatDate(entry.expiryDate) }}</p>
      </ion-label>
    </ion-item>
    <div class="item--archived" v-if="entry.isArchived">
      <ion-label>Archived</ion-label>
    </div>

    <ion-item-options>
      <ion-item-option @click="handleEvent('edit')">Edit</ion-item-option>
      <ion-item-option color="danger" @click="handleEvent('delete')">Delete</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
  import { Ref, capitalize, reactive, ref, computed } from 'vue';
  import { IonItem, IonItemSliding, IonCheckbox, IonIcon, IonLabel, IonItemOption, IonItemOptions } from '@ionic/vue';
  import { fastFoodOutline } from 'ionicons/icons';
  import { format } from 'date-fns';
  import { IFoodEntry, FoodEntryItemEmitType } from '../models';

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
        emit('onDelete', props.entry);
        break;
      default:
        break;
    }
  }
</script>

<style lang="scss">
  .food-entry-item {
    ion-item {
      position: relative;
      --padding-start: 1rem;

      ion-label {
        margin-left: 1rem;
      }
    }

    .archive-checkbox {
      position: absolute;
      top: 1rem;
      left: 1rem;
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
</style>
