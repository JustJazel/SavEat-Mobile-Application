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
          <!--Add entry-->
          <ion-item>
            <ion-input label="Add an entry: " placeholder="add food here" label-placement="stacked" v-model="form.name"></ion-input>
          </ion-item>

          <!--Food Picker-->
          <ion-item>
            <FoodTypePicker @change="(type) => (form.type = type)" :type="form.type" />
          </ion-item>

          <!--Description-->
          <ion-item class="description-item">
            <ion-input
              label="Description: "
              placeholder="food notes here"
              label-placement="stacked"
              v-model="form.food_description"
            ></ion-input>
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
          <ion-item class="unit-cost-item">
            <ion-input label="Unit Cost: " placeholder="0" label-placement="stacked" type="number" v-model="form.cost"></ion-input>
          </ion-item>

          <!-- Food Quantity -->
          <ion-item class="quantity-item">
            <ion-input label="Quantity: " placeholder="0" label-placement="stacked" type="number" v-model="form.quantity"></ion-input>
          </ion-item>

          <!-- Unit Measurement -->
          <ion-item class="unit-measurement-item">
            <ion-label position="stacked">Unit Measurement</ion-label>
            <ion-select v-model="form.unit_measurement" interface="popover">
              <ion-select-option value="pieces">Pieces</ion-select-option>
              <ion-select-option value="kg">Kg</ion-select-option>
              <ion-select-option value="ml">Ml</ion-select-option>
              <ion-select-option value="l">L</ion-select-option>
              <ion-select-option value="g">G</ion-select-option>
            </ion-select>
          </ion-item>

          <!-- Add button-->
          <ion-item>
            <ion-button type="submit" expand="block" :disabled="!form.name">Add</ion-button>
          </ion-item>
        </ion-list>
      </form>

      <!-- Filter By Food Type Selection -->
      <ion-label class="food-entries__filter-header">Filter By Food Type</ion-label>
      <ion-list>
        <ion-item v-for="filter in filterTypes" :key="filter.name">
          <ion-checkbox label-placement="start" v-model="filter.checked" class="black-checkbox">
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
          class="food-entry-checkbox"
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
          class="food-entry-checkbox"
        />
      </ion-list>

      <ion-label v-if="!userStore.foodEntries.length">No items. Please add entries.</ion-label>
      <br />
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
  ion-button {
    color: #f4f4f4;
    background-color: #333531;
    border-radius: 10px;
  }
  ion-title {
    font-weight: bolder;
  }

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
      font-weight: bolder;
    }
  }

  .description-item ion-input,
  .unit-cost-item ion-input,
  .quantity-item ion-input {
    --padding-start: 0.5rem;
    --padding-end: 0.5rem;
    margin-top: 1rem;
  }

  .unit-measurement-item {
    --padding-start: 0.5rem;
    --padding-end: 0.5rem;
    margin-top: 1rem;
  }

  ion-item {
    --inner-padding: 0.5rem 0;
    --highlight-background: transparent;
  }

  ion-label {
    margin-bottom: 0.25rem;
  }

  .unit-measurement-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1rem;
  }

  .unit-measurement-item ion-label {
    margin-bottom: 0.5rem;
  }

  .unit-measurement-item ion-select {
    width: 100%;
    --height: 44px; /* Adjust the height to match other inputs */
    --padding-start: 0;
    --padding-end: 0;
    --padding-top: 0;
    --padding-bottom: 0;
    line-height: normal; /* Ensure text is vertically centered */
  }

  .black-checkbox {
    --background: #5e823b;
    --border-color: #5e823b;
    --checkmark-color: white;
    --size: 15px; /* Adjust size if needed */
    color: #405729 !important;
    font-weight: lighter;
  }

  .food-entry-checkbox {
    --background: #405729;
    --border-color: #405729;
    --checkmark-color: white;
    --size: 20px; /* Adjust size if needed */
  }

  .tabText {
    color: #000000 !important;
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
    IonSelect,
    IonSelectOption,
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
    unit_measurement: '', // Add this field
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
        unit_measurement: form.unit_measurement, // Include this field
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
