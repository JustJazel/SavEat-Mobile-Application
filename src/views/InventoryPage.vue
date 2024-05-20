<template>
  <ion-page>
    <Toolbar></Toolbar> <!-- Include the Toolbar component -->

    <ion-searchbar animated="true" placeholder="Search item"></ion-searchbar>

    <ion-content id="main-content">
      <!-- ITEM CONTENTS -->
      <div class="card-container">
        
        <ion-card expand="block" class="square-card" @click="presentModal">
          <ion-card-content class="icon-content">
            <ion-icon :icon="addSharp" class="large-icon"></ion-icon>
          </ion-card-content>
        </ion-card>

        <!-- THESE ARE PLACEHOLDERS -->
        <ion-card class="square-card">
          <ion-card-header>
            <ion-card-title>Food Name</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            Description of the food item goes here. This is a placeholder for the content of the card.
          </ion-card-content>

          <ion-button fill="clear">Action 1</ion-button>
          <ion-button fill="clear">Action 2</ion-button>
        </ion-card>

        <ion-card class="square-card">
          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            Here's a small text description for the card content. Nothing more, nothing less.
          </ion-card-content>

          <ion-button fill="clear">Action 1</ion-button>
          <ion-button fill="clear">Action 2</ion-button>
        </ion-card>
      </div>
      <!-- END OF ITEM CONTENTS-->

      <!-- MODAL CONTENT -->
      <!-- ADD FORM HERE -->
      <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="handleModalDismiss" class="modal-shape">
        <ion-content class="modal-content">
          <ion-toolbar style="margin-left: 15px; margin-top: 10px; margin-bottom: 20px;">
            <ion-input
                label="FOOD NAME"
                label-placement="stacked"
                placeholder="Input food name"
              >
              </ion-input>
            <ion-buttons slot="end">
              <ion-button color="dark" @click="dismissModal">
                <ion-icon name="close-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>

          <ion-list class="modal-list">
            <ion-item>
              <ion-label position="stacked">FOOD QUANTITY:</ion-label>
              <ion-input type="number" placeholder="Enter quantity"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">MIN LEVEL:</ion-label>
              <div class="min-level-container">
                <ion-input type="number" placeholder="Enter min level"></ion-input>
                <ion-icon name="close-outline"></ion-icon>
              </div>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">UNIT PRICE:</ion-label>
              <ion-input type="number" placeholder="Enter unit price"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label style="">FOOD TYPE</ion-label>
              <ion-radio-group value="processed">
                  <ion-label>Processed</ion-label>
                  <ion-radio slot="start" value="processed"></ion-radio>
                  <ion-label>Perishable</ion-label>
                  <ion-radio slot="start" value="perishable"></ion-radio>
              </ion-radio-group>
            </ion-item>


            <!-- Store Date -->
            <ion-item class="food-entries__date-item">
              <ion-label position="stacked">Store Date</ion-label>
              <ion-datetime-button id="store-date-button" datetime="store-datetime"></ion-datetime-button>
              <ion-modal keep-contents-mounted="true">
                <ion-datetime id="store-datetime" presentation="date"></ion-datetime>
              </ion-modal>
            </ion-item>
            <!-- Expiry Date -->
            <ion-item class="food-entries__date-item">
              <ion-label position="stacked">Expiry Date</ion-label>
              <ion-datetime-button id="expiry-date-button" datetime="expiry-datetime"></ion-datetime-button>
              <ion-modal keep-contents-mounted="true">
                <ion-datetime id="expiry-datetime" presentation="date"></ion-datetime>
              </ion-modal>
            </ion-item>


            <ion-item>
              <ion-label position="stacked">ITEM NOTES:</ion-label>
              <ion-textarea placeholder="Enter notes"></ion-textarea>
            </ion-item>
          </ion-list>

          <ion-button expand="block" color="dark" @click="createItem">CREATE</ion-button>
        </ion-content>
      </ion-modal>
      <!-- END OF MODAL CONTENT -->
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonSearchbar, IonIcon, IonModal, IonToolbar, IonTitle, IonButtons, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonRadioGroup, IonRadio, IonDatetime } from '@ionic/vue';
import Toolbar from './components/Toolbar.vue';
import { addSharp } from 'ionicons/icons';
import { closeOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'InventoryPage',
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonPage,
    Toolbar,
    IonSearchbar,
    IonIcon,
    IonModal,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonRadioGroup,
    IonRadio,
    IonDatetime
  },
  setup() {
    const isModalOpen = ref(false);
    const form = ref({
      storeDate: '',
      expiryDate: '',
    });

    const presentModal = () => {
      isModalOpen.value = true;
    };

    const dismissModal = () => {
      isModalOpen.value = false;
    };

    const handleModalDismiss = () => {
      isModalOpen.value = false;
    };

    const createItem = () => {
      // Add item creation logic here
    };

    return {
      addSharp,
      isModalOpen,
      presentModal,
      dismissModal,
      handleModalDismiss,
      createItem,
      closeOutline,
      form
    };
  }
});
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}

.square-card {
  width: 250px; 
  height: 250px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.large-icon {
  font-size: 48px;
}

.modal-shape {
  border-radius: 10px;
}

.modal-content {
  padding: 20px;
}

.modal-list ion-item {
  margin-bottom: 10px;
}

.min-level-container {
  display: flex;
  align-items: center;
}

.min-level-container ion-input {
  flex-grow: 1;
  margin-right: 10px;
}

.min-level-container ion-icon {
  font-size: 24px;
}

.radio-item {
  --padding-start: 0px;
  --inner-padding-end: 0px;
  --padding-end: 0px;
}

.radio-item ion-radio {
  --size: 16px;
  --border-width: 1px;
}

ion-radio-group {
  display: flex;
  gap: 10px;
  font-size: 15px;
}

.food-entries__date-item ion-datetime-button {
  --padding-start: 0px;
  --padding-end: 0px;
}
</style>
