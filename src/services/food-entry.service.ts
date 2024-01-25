import { useDebounceFn } from '@vueuse/core';
import { reactive } from 'vue';
import { modalController, toastController } from '@ionic/vue';

import { IFoodEntry, IFoodEntryForm } from '../models';
import { useUserStore } from '../store';

import FoodEntryModal from '../components/FoodEntryModal.vue';
import ExpiringEntriesModal from '../components/ExpiringEntriesModal.vue';

const userStore = useUserStore();

export const debounceArchiveToggle = useDebounceFn(async (entry: IFoodEntry) => {
  await userStore.updateFoodEntry(entry);
}, 150);

export async function onDeleteEntry(entry: IFoodEntry) {
  await userStore.removeFoodEntry(entry);
}

export async function onEditEntry(entry: IFoodEntry): Promise<void> {
  const parsedEntry = JSON.parse(JSON.stringify(entry));
  const cloneEntry = reactive(parsedEntry as IFoodEntryForm);

  const modal = await modalController.create({
    component: FoodEntryModal,
    componentProps: {
      form: cloneEntry,
    },
  });

  await modal.present();

  const { data, role } = await modal.onWillDismiss<IFoodEntry>();
  if (!data || role === 'cancel') {
    return;
  }
  await userStore.updateFoodEntry(data);
}

export async function openExpiringEntriesModal() {
  if (!userStore.getExpiringFoodEntries.length) {
    return;
  }

  const modal = await modalController.create({
    component: ExpiringEntriesModal,
  });

  const toast = await toastController.create({
    color: 'warning',
    message: 'Some entries are going to expire or have already been expired.',
    position: 'bottom',
    duration: 10000,
    buttons: [
      {
        text: 'Dismiss',
        role: 'cancel',
      },
    ],
  });

  await modal.present();
  await toast.present();
}
