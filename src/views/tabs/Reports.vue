<template>
  <ion-page class="reports">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ Tabs.REPORTS }}</ion-title>
        <ion-item slot="end">
          <ion-button>
            <ion-icon class="black-icon" name="notifications-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-toolbar>

      <!-- Segment Area-->
      <ion-segment v-model="selectedSegment">
        <ion-segment-button value="usageReport" class="usage-report-button">
          <ion-label>Usage Report</ion-label>
        </ion-segment-button>
        <ion-segment-button value="restockReport" class="restock-report-button">
          <ion-label>Restock Report</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Usage Report Form Template -->
      <div v-if="selectedSegment === 'usageReport'">
        <form @submit.prevent="onAddFoodEntry">
          <ion-list>
            <!-- Usage Report Date -->
            <ion-item class="food-entries__date-item">
              <ion-label :position="'stacked'">Usage Report Date</ion-label>
              <ion-datetime-button id="usage-date-button" datetime="usage-datetime"></ion-datetime-button>
              <ion-modal :keep-contents-mounted="true">
                <ion-datetime id="usage-datetime" presentation="date" v-model="form.storeDate"></ion-datetime>
              </ion-modal>
            </ion-item>

            <!-- Food input -->
            <ion-item>
              <ion-label position="stacked">Food:</ion-label>
              <ion-input type="text" v-model="form.food_description"></ion-input>
            </ion-item>

            <!-- Amount Used -->
            <ion-item>
              <ion-label position="stacked">Amount Used:</ion-label>
              <ion-input type="number" v-model="form.quantity"></ion-input>
            </ion-item>

            <!-- Unit Measurement -->
            <ion-item>
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
              <ion-button type="submit" expand="block" :disabled="!form.name">Add</ion-button>
            </ion-item>
          </ion-list>
        </form>

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
      </div>

      <!-- Restock Report Template -->
      <div v-if="selectedSegment === 'restockReport'">
        <form @submit.prevent="onAddFoodEntry">
          <ion-list>
            <!-- Restock Report Date -->
            <ion-item class="food-entries__date-item">
              <ion-label :position="'stacked'">Restock Report Date</ion-label>
              <ion-datetime-button id="restock-date-button" datetime="restock-datetime"></ion-datetime-button>
              <ion-modal :keep-contents-mounted="true">
                <ion-datetime id="restock-datetime" presentation="date" v-model="form.storeDate"></ion-datetime>
              </ion-modal>
            </ion-item>

            <!-- Food input -->
            <ion-item>
              <ion-label position="stacked">Food:</ion-label>
              <ion-input type="text" v-model="form.food_description"></ion-input>
            </ion-item>

            <!-- Amount Used -->
            <ion-item>
              <ion-label position="stacked">Amount Used:</ion-label>
              <ion-input type="number" v-model="form.quantity"></ion-input>
            </ion-item>

            <!-- Unit Measurement -->
            <ion-item>
              <ion-label position="stacked">Unit Measurement</ion-label>
              <ion-select v-model="form.unit_measurement" interface="popover">
                <ion-select-option value="pieces">Pieces</ion-select-option>
                <ion-select-option value="kg">Kg</ion-select-option>
                <ion-select-option value="ml">Ml</ion-select-option>
                <ion-select-option value="l">L</ion-select-option>
                <ion-select-option value="g">G</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Total Cost -->
            <ion-item>
              <ion-label position="stacked">Total Cost:</ion-label>
              <ion-input type="number" v-model="form.quantity"></ion-input>
            </ion-item>

            <ion-item>
              <ion-button type="submit" expand="block" :disabled="!form.name">Add</ion-button>
            </ion-item>
          </ion-list>
        </form>

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
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
  .black-icon {
    color: black !important;
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
      font-weight: bold;
    }
  }

  /* Custom styles for the Restock Report segment button */
  ion-segment-button.restock-report-button {
    color: #59655a !important;
  }

  ion-segment-button.restock-report-button.segment-button-checked {
    color: #333531 !important; /* Optional: Change the text color when selected */
    background-color: #948f86 !important; /* Change background color when selected */
  }

  ion-segment-button.usage-report-button {
    color: #59655a !important;
  }

  ion-segment-button.usage-report-button.segment-button-checked {
    color: #333531 !important; /* Optional: Change the text color when selected */
    background-color: #8f9486 !important; /* Change background color when selected */
  }

  .segment-button-checked {
    background-color: #8f9486 !important;
    color: #333531 !important; /* Optional: Change the text color when selected */
  }
</style>

<script setup lang="ts">
  import 'ionicons';

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
    IonSegment,
    IonSegmentButton,
    IonIcon,
  } from '@ionic/vue';
  import { Ref, reactive, ref, computed } from 'vue';
  import { initFoodEntries } from '../../supabase';
  import { useUserStore } from '../../store';
  import { Tabs, IFoodEntryForm, IFoodEntryFilterType, FoodEntryType, IFoodEntry } from '../../models';
  import { debounceArchiveToggle, onDeleteEntry, onEditEntry, openExpiringEntriesModal } from '../../services';
  import FoodTypePicker from '../../components/FoodTypePicker.vue';
  import FoodEntryItem from '../../components/FoodEntryItem.vue';
  import { notifications } from 'ionicons/icons';

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

  const selectedSegment = ref('usageReport'); // Track the selected segment

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
