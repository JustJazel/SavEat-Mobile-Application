<template>
  <ion-page class="food-entries">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ Tabs.FOOD_ENTRIES }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- Add Food Entry Form Template -->
      <form @submit.prevent="onAddFoodEntry">
        <ion-list>
          <ion-item>
            <ion-input
              label="Add an entry: "
              placeholder="store some food here..."
              label-placement="stacked"
              v-model="form.name"
            ></ion-input>
          </ion-item>
          <ion-item>
            <FoodTypePicker @change="(type) => (form.type = type)" :type="form.type" />
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Description</ion-label>
            <ion-input type="text" v-model="form.food_description"></ion-input>
          </ion-item>
          <!-- Store Date -->
          <ion-item class="food-entries__date-item">
            <ion-label :position="'stacked'">Store Date</ion-label>
            <ion-datetime-button id="store-date-button" datetime="store-datetime"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="store-datetime" presentation="date" v-model="form.storeDate"></ion-datetime>
            </ion-modal>
          </ion-item>
          <!-- Expiry Date -->
          <ion-item class="food-entries__date-item">
            <ion-label :position="'stacked'">Expiry Date</ion-label>
            <ion-datetime-button id="expiry-date-button" datetime="expiry-datetime"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="expiry-datetime" presentation="date" :min="form.storeDate" v-model="form.expiryDate"></ion-datetime>
            </ion-modal>
          </ion-item>
          <!-- Food Unit Cost -->
          <ion-item>
            <ion-label position="stacked">Unit Cost</ion-label>
            <ion-input type="number" v-model="form.cost"></ion-input>
          </ion-item>
          <!-- Food Quantity -->
          <ion-item>
            <ion-label position="stacked">Quantity</ion-label>
            <ion-input type="number" v-model="form.quantity"></ion-input>
          </ion-item>

          <ion-item>
            <ion-button type="submit" expand="block" :disabled="!form.name" @click="">Add</ion-button>
          </ion-item>
        </ion-list>
      </form>

      <!-- Filter By Food Type Selection -->
      <ion-label class="food-entries__filter-header">Filter By Food Type</ion-label>
      <ion-list>
        <ion-item v-for="filter in filterTypes" :key="filter.name">
          <ion-checkbox label-placement="start" v-model="filter.checked">
            {{ filter.name }}
          </ion-checkbox>
        </ion-item>
      </ion-list>

      <!-- Filtered Food Entry List Template -->
      <ion-list class="food-entries__list" v-if="filteredFoodEntries.length">
        <FoodEntryItem
          v-for="entry in filteredFoodEntries"
          :entry="entry"
          @on-toggle="debounceArchiveToggle($event)"
          @on-delete="onDeleteEntry($event)"
          @on-edit="onEditEntry($event)"
        />
      </ion-list>

      <!-- Get Original Food Entry List Template -->
      <ion-list class="food-entries__list" v-else>
        <FoodEntryItem
          v-for="entry in userStore.foodEntries"
          :entry="entry"
          @on-toggle="debounceArchiveToggle($event)"
          @on-delete="onDeleteEntry($event)"
          @on-edit="onEditEntry($event)"
        />
      </ion-list>

      <ion-label v-if="!userStore.foodEntries.length">No items. Please add entries.</ion-label>
      <br />
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
  .food-entries {
    &__date-item {
      --padding-start: 0;
      padding-left: 1rem;

      ion-datetime-button {
        padding: 10px 0;
      }
    }

    &__filter-header {
      display: block;
      margin-top: 1rem;
      padding: 0 1rem;
      font-size: 1rem;
      font-weight: bold;
    }
  }
</style>

<script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonList,
    onIonViewDidEnter,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonCheckbox,
  } from '@ionic/vue';
  import { Ref, reactive, ref, computed } from 'vue';
  import { initFoodEntries } from '../../supabase';
  import { useUserStore } from '../../store';
  import { Tabs, IFoodEntryForm, IFoodEntryFilterType, FoodEntryType, IFoodEntry } from '../../models';
  import { debounceArchiveToggle, onDeleteEntry, onEditEntry, openExpiringEntriesModal } from '../../services';

  import FoodTypePicker from '../../components/FoodTypePicker.vue';

  import FoodEntryItem from '../../components/FoodEntryItem.vue';

  const userStore = useUserStore();

  const filterTypes: Ref<IFoodEntryFilterType[]> = ref([
    {
      name: 'Perishable',
      value: FoodEntryType.PERISHABLE,
      checked: false,
    },
    {
      name: 'Processed',
      value: FoodEntryType.PROCESSED,
      checked: false,
    },
  ]);

  const initialForm: IFoodEntryForm = {
    name: '',
    type: FoodEntryType.PERISHABLE,
    storeDate: new Date().toISOString(),
    expiryDate: new Date().toISOString(),
    isArchived: false,
    quantity: 0,
    cost: 0,
    food_description: '',
  };

  const form = reactive({ ...initialForm });

  const filteredFoodEntries = computed(() => {
    return userStore.foodEntries.filter((entry) => {
      return filterTypes.value.some((filter) => {
        return filter.checked && filter.value === entry.type;
      });
    });
  });

  onIonViewDidEnter(() => {
    initFoodEntries();
    openExpiringEntriesModal();
  });

  async function onAddFoodEntry() {
    try {
      if (form.quantity < 0) {
        alert('Quantity cannot be negative. Please enter a valid value.');
        return;
      }
      if (form.cost < 0) {
        alert('Cost cannot be negative. Please enter a valid value.');
        return;
      }
      const foodEntry: IFoodEntry = {
        id: '',
        name: form.name,
        type: form.type,
        storeDate: form.storeDate,
        expiryDate: form.expiryDate,
        isArchived: false,
        quantity: form.quantity,
        cost: form.cost,
        food_description: form.food_description,
      };

      await userStore.addFoodEntry(foodEntry);

      resetForm();
    } catch (error) {
      alert('An error occurred while adding the food entry. Please try again.');
    }
  }

  function resetForm() {
    Object.assign(form, initialForm);
  }
</script>
