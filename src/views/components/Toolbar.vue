<template>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>
            Welcome, user!
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <!-- Sidebar menu content -->
        <ion-list>
            <ion-item href="/home">
                <ion-icon aria-hidden="true" :icon="home" slot="start"></ion-icon>
                <ion-label>Home</ion-label>
            </ion-item>
            <ion-item href="/inventory">
                <ion-icon aria-hidden="true" :icon="fileTrayStacked" slot="start"></ion-icon>
                <ion-label>Inventory</ion-label>
            </ion-item>
            <ion-item href="/restock">
                <ion-icon aria-hidden="true" :icon="statsChart" slot="start"></ion-icon>
                <ion-label>Restock Report</ion-label>
            </ion-item>
            <ion-item href="/usage">
                <ion-icon aria-hidden="true" :icon="trendingUp" slot="start"></ion-icon>
                <ion-label>Usage Report</ion-label>
            </ion-item>
            <ion-item href="/suggestions">
                <ion-icon aria-hidden="true" :icon="search" slot="start"></ion-icon>
                <ion-label>Suggestions</ion-label>
            </ion-item>
        </ion-list>

        <div class="bottom-menu">
            <ion-list>
                <ion-item href="/editprofile">
                    <ion-label>Edit Profile</ion-label>
                </ion-item>

                <ion-item href="/logout">
                    <ion-label>Log out</ion-label>
                </ion-item>
            </ion-list>
        </div>
      </ion-content>
    </ion-menu>
  
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>(change into name of page)</ion-title>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonIcon } from '@ionic/vue';
  import { home } from 'ionicons/icons';
  import { fileTrayStacked } from 'ionicons/icons';
  import { search } from 'ionicons/icons';
  import { trendingUp } from 'ionicons/icons';
  import { statsChart } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'Toolbar',
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonItem,
      IonList,
      IonMenu,
      IonMenuButton,
      IonTitle,
      IonToolbar,
      IonIcon
    },
    setup() {
    return {
      home,
      fileTrayStacked,
      search,
      trendingUp,
      statsChart
    };
  }
  });
  </script>

  <style scoped>
  .bottom-menu {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  </style>