<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
  import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';
  import { useUserStore, IUser } from './store';
  import { onMounted } from 'vue';
  import { supabase } from './supabase';

  const userStore = useUserStore();
  const ionRouter = useIonRouter();

  onMounted(() => {
    getCurrentUser();
  });

  async function getCurrentUser() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      ionRouter.push('/login');
      return;
    }

    const user: IUser = {
      uuid: data.session.user.id,
      email: data.session.user.email,
      firstName: data.session.user.user_metadata.first_name,
      lastName: data.session.user.user_metadata.last_name,
    };

    userStore.setUser(user);
    ionRouter.push('/tabs');
  }
</script>
