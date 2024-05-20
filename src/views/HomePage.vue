<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>LOGO</ion-title>
        <ion-buttons slot="end">
          <ion-button>Log In</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Main Image -->
      <div class="main-image-container">
        <img src="@assets/images/home.jpeg" alt="Main Image" />
      </div>

      <!-- How It Works Section -->
      <div class="how-it-works">
        <h1><b>DON'T WASTE IT, SAVE IT!</b></h1>
        <p>HOW IT WORKS</p>
        <ion-icon name="home"></ion-icon>

        <!-- Steps -->
        <div class="steps">
          <ion-row>
            <ion-col size="3">
              <div class="step-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </ion-col>
            <ion-col size="3">
              <div class="step-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </ion-col>
            <ion-col size="3">
              <div class="step-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </ion-col>
            <ion-col size="3">
              <div class="step-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="4">
              <div class="bottom-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </ion-col>
            <ion-col size="4">
              <div class="bottom-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </ion-col>
            <ion-col size="4">
              <div class="bottom-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
            </ion-col>
          </ion-row>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonRow, IonCol, IonIcon } from '@ionic/vue';
import '../assets/images/home.jpeg';

export default {
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonRow,
    IonCol,
    IonIcon,
  },
};
</script>

<style scoped>
.main-image-container {
  width: 100%;
  height: 300px; /* Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image-container img {
  max-width: 100%;
  height: auto;
}

h1 {
  text-align: left;
  margin-left: 50px;
}

p {
  margin-left: 50px;
}

.steps {
  margin-top: 20px;
}

.step-icon, .bottom-icon {
  text-align: center;
  font-size: 2em; /* Adjust icon size as needed */
  border: 1px solid red; /* Add border to debug */
}
</style>
