<template>
  <ion-page>
    <ion-menu content-id="main-content" menu-id="main-menu" side="end">
      <ion-header>
        <ion-toolbar>
          <ion-title>Hello, {{ `${userStore.getUser?.firstName}` ?? 'Guest' }}!</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <!--Account Details-->
          <ion-item v-if="userStore.getUser">
            <ion-label>Account</ion-label>
            <ion-text>{{ userStore.getUserFullName }}</ion-text>
          </ion-item>

          <!--Edit Profile Details-->
          <ion-item>
            <ion-label>Edit Profile</ion-label>
            <ion-button color="warning" @click="goToEditProfile">Edit</ion-button>
          </ion-item>

          <!--Delete Account-->
          <ion-item>
            <ion-label>Delete Account</ion-label>
            <ion-button color="danger" @click="deleteAccount">Delete</ion-button>
          </ion-item>

          <!--Logout To Saveat-->
          <ion-item>
            <ion-label>Logout</ion-label>
            <ion-button color="danger" @click="logout">Logout</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-content id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-tabs :onIonTabsDidChange="handleTabChange">
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom" id="navigation-tabs">
          <ion-tab-button v-for="tab of TAB_ROUTES" :tab="tab.name" :href="tab.path">
            <ion-icon aria-hidden="true" :icon="tab.icon" />
            <ion-label>{{ tab.name }}</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonButton,
    menuController,
    IonText,
  } from '@ionic/vue';
  import { TAB_ROUTES } from './tabs/tabs.model';
  import { supabase } from '../supabase';
  import { ref } from 'vue';
  import { useIonRouter } from '@ionic/vue';
  import { useUserStore } from '../store';
  import { useRouter } from 'vue-router';

  const pageTitle = ref('Menu');
  const ionRouter = useIonRouter();
  const userStore = useUserStore();
  const router = useRouter();

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('logout ~ error. Will redirect to /login view:', error);
      ionRouter.navigate({ path: '/login', replace: true });
      return;
    }

    console.log('User Logged Out.');

    userStore.$reset();
    console.log('userStore Food Entries: ', userStore.getFoodEntries);

    await menuController.close();
    ionRouter.navigate({ path: '/login', replace: true });
  }

  async function goToEditProfile() {
    try {
      console.log('Navigating to Edit Profile');
      // Use a relative path to navigate to the "edit-profile" route
      await router.push('/edit-profile');
    } catch (error) {
      console.error('Navigation error:', error);
    }

    await menuController.close();
  }

  async function deleteAccount() {
    try {
      // Get the current user ID
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Checks if user can be accessesed cause IDE is being a stingy bitch
      if (!user) {
        console.error('Something went wrong');
        return;
      }

      const confirm = window.confirm('This will delete your account permanently and cannot be undone. Press confirm to continue.');

      if (!confirm) {
        return;
      }

      const currentUserId = user.id;

      // First logout the user
      await logout();

      // Delete all the items made by said user
      const { error: deleteEntriesError } = await supabase.from('food_entries').delete().eq('auth_user_id', currentUserId);

      // Then delete the account
      const { data, error } = await supabase.auth.admin.deleteUser(currentUserId);

      if (error) {
        console.error('Error deleting user account:', error.message);
      } else {
        console.log('User account deleted successfully:', data);
      }
    } catch (error) {
      console.error('Error during deleteAccount:', (error as Error).toString());
      // Handle the error as needed
    }
  }

  const handleTabChange = (event: { tab: string }) => {
    const tabs = Object.values(TAB_ROUTES).map((tab) => tab.name);
    const tabName = tabs.includes(event.tab) ? event.tab : 'Menu';
    pageTitle.value = tabName;
  };
</script>
