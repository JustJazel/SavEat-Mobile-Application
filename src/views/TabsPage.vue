<template>
  <ion-page>
    <ion-menu content-id="main-content" menu-id="main-menu" side="start">
      <ion-header>
        <ion-toolbar>
          <ion-title class="tabText" style="display: flex; align-items: center">
            <ion-icon size="Large" :icon="personCircleOutline"></ion-icon>
            Hello, {{ `${userStore.getUser?.firstName}` ?? 'Guest' }}!
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <!-- Account Details -->
          <ion-item v-if="userStore.getUser">
            <ion-label>Account</ion-label>
            <ion-text>{{ userStore.getUserFullName }}</ion-text>
          </ion-item>

          <!-- Edit Profile Details -->
          <ion-item v-ripple>
            <ion-label>Edit Profile</ion-label>
            <ion-icon class="black-icon" size="Large" :icon="createOutline" @click="goToEditProfile"></ion-icon>
          </ion-item>
        </ion-list>

        <!-- Logout -->
        <ion-item class="logout-item" v-ripple @click="logout">
          <ion-label>Logout</ion-label>
          <ion-icon class="black-icon" size="Large" :icon="exitOutline"></ion-icon>
        </ion-item>
      </ion-content>
    </ion-menu>

    <ion-content id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons class="tabText" slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title class="tabText">{{ pageTitle }}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="handleOpenExpiringEntriesModal">
              <ion-icon class="tabText" :icon="notificationsOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-tabs @ionTabsDidChange="handleTabChange">
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom" id="navigation-tabs">
          <ion-tab-button v-for="tab in TAB_ROUTES" :key="tab.name" :tab="tab.name" :href="tab.path">
            <ion-icon :icon="tab.icon" aria-hidden="true"></ion-icon>
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
    IonText,
    menuController,
  } from '@ionic/vue';
  import { notificationsOutline, createOutline, exitOutline, personCircleOutline } from 'ionicons/icons';
  import { TAB_ROUTES } from './tabs/tabs.model';
  import { supabase } from '../supabase';
  import { ref, onMounted } from 'vue';
  import { useIonRouter } from '@ionic/vue';
  import { useUserStore } from '../store';
  import { useRouter } from 'vue-router';
  import { debounceArchiveToggle, onDeleteEntry, onEditEntry, openExpiringEntriesModal } from '../services';

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
    ionRouter.navigate({ path: '/home', replace: true });
  }

  async function goToEditProfile() {
    try {
      console.log('Navigating to Edit Profile');
      await router.push('/edit-profile');
    } catch (error) {
      console.error('Navigation error:', error);
    }

    await menuController.close();
  }

  const handleTabChange = (event: { tab: string }) => {
    const tabs = Object.values(TAB_ROUTES).map((tab) => tab.name);
    const tabName = tabs.includes(event.tab) ? event.tab : 'Menu';
    pageTitle.value = tabName;
  };

  const applyTheme = () => {
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const tabTextElements = document.querySelectorAll<HTMLElement>('.tabText');

    if (darkMode) {
      tabTextElements.forEach((element) => {
        element.style.color = getComputedStyle(document.documentElement).getPropertyValue('--tab-text-dark');
      });
    } else {
      tabTextElements.forEach((element) => {
        element.style.color = getComputedStyle(document.documentElement).getPropertyValue('--tab-text-light');
      });
    }
  };

  const handleOpenExpiringEntriesModal = () => {
    openExpiringEntriesModal();
  };

  onMounted(() => {
    applyTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  });
</script>

<style scoped lang="scss">
  @media screen and (min-width: 400px) {
  }

  @media screen and (min-height: 1600px) {
  }

  .logout-item {
    margin-top: 150%;
    padding-top: 10px;
    border-top: 1px solid #e0e0e0; /* Add a top border to separate from other items */
    transition: background-color 0.3s;
  }

  .logout-item:active {
    background-color: #e0e0e0; /* Change background color on press */
  }

  .black-icon {
    color: #405729 !important;
    transition: transform 0.2s ease-in-out; /* Add smooth transition for transform */
  }

  .black-icon:active {
    transform: scale(0.9); /* Add press effect by scaling down */
  }

  .tabText {
    color: var(--tab-text-light) !important;
  }

  ion-icon {
    font-size: 22px; /* You can adjust this value as needed */
  }

  /* Ripple effect styles */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>
