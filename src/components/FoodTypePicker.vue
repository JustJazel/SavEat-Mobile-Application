<template>
  <ion-select justify="start" label-placement="stacked" label="Select Food Type" @ionChange="onTypeSelected($event)" :value="props.type">
    <ion-select-option v-for="option in foodTypeOptions" :value="option.value">
      {{ option.text }}
    </ion-select-option>
  </ion-select>
</template>

<script setup lang="ts">
  import { IonSelect, IonSelectOption } from '@ionic/vue';
  import { FoodEntryType } from '../models';
  import { ref } from 'vue';

  interface FoodTypePickerProps {
    type: FoodEntryType;
  }

  const props = defineProps<FoodTypePickerProps>();

  const emit = defineEmits<{
    change: [value: FoodEntryType];
  }>();

  const selected = ref<FoodTypePickerProps>({
    type: FoodEntryType.PERISHABLE,
  });

  const foodTypeOptions = [
    {
      text: 'Perishable',
      value: FoodEntryType.PERISHABLE,
    },
    {
      text: 'Processed',
      value: FoodEntryType.PROCESSED,
    },
  ];

  function onTypeSelected(event: CustomEvent) {
    const type = event.detail.value as FoodEntryType;
    selected.value = {
      type,
    };
    emit('change', type);
  }
</script>
<style lang="scss"></style>
