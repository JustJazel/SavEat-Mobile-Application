<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="header-content">
          <div class="logo">
            <router-link to="/home">
              <img src="@assets/images/LogoSav1.png" alt="Logo" />
            </router-link>
          </div>
          <div class="buttons">
            <ion-buttons slot="end">
              <ion-button class="login">Log In</ion-button>
              <ion-button class="signup">Sign Up</ion-button>
            </ion-buttons>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <div class="page-content">
      <ion-content>
        <!-- Main Image -->
        <div class="main-image-container">
          <img src="@assets/images/home.jpg" alt="Main Image" />
          <div class="text-overlay">
            <h1><b>DON'T WASTE IT, SAVE IT!</b></h1>
            <p>Track, manage, and reduce food waste with Saveat—your smart solution for a sustainable kitchen.</p>
            <button class="btn" @click="scrollToSteps">HOW IT WORKS</button>
          </div>
        </div>

        <!-- Steps -->
        <div class="steps" ref="steps">
          <ion-row class="steps-row">
            <ion-col size="12" size-md="4" class="step-column">
              <ion-icon :icon="fileTrayStacked" class="step-icon"></ion-icon>
              <p class="step-title"><b>Track Inventory</b></p>
              <p class="step-description">With Saveat, you can easily monitor all your food items, keep track of store dates, and manage expiration dates with precision. Our user-friendly interface ensures you always know what's in your pantry, reducing waste and making meal planning a breeze.</p>
            </ion-col>
            <ion-col size="12" size-md="4" class="step-column">
              <ion-icon :icon="barChart" class="step-icon"></ion-icon>
              <p class="step-title"><b>Generate Reports</b></p>
              <p class="step-description">Saveat enables you to create clear, organized usage and restock reports. This feature helps you save time and reduce confusion, providing you with a comprehensive overview of your food inventory at any given moment. Stay informed and make smarter decisions about your food consumption.</p>
            </ion-col>
            <ion-col size="12" size-md="4" class="step-column">
              <ion-icon :icon="fastFood" class="step-icon"></ion-icon>
              <p class="step-title"><b>Discover Recipes</b></p>
              <p class="step-description">By utilizing the Spoonacular API, you can find delicious recipes that make the most out of what you have on hand. Whether you're looking for inspiration or need to use up certain items, our recipe suggestions will help you cook creatively and sustainably.</p>
            </ion-col>
          </ion-row>
        </div>
      </ion-content>

      <div class="footer">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              <img src="@assets/images/LogoSav1.png" alt="Logo" />
            </div>
            <p class="footer-description">
              Your go-to platform for reducing food waste and keeping track of resources. Join us in making a difference!
            </p>
          </div>
          <div class="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Follow Us</h4>
            <ul class="social-links">
              <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Contact Us</h4>
            saveatapp@gmail.com
          </div>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonRow, IonCol, IonIcon } from '@ionic/vue';
import '../assets/images/home.jpg';
import '../assets/images/LogoSav1.png';
import { barChart, fileTrayStacked, fastFood } from 'ionicons/icons';
import { ref } from 'vue';

export default {
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonRow,
    IonCol,
    IonIcon,
  },
  setup() {
    const steps = ref(null);

    const scrollToSteps = () => {
      if (steps.value) {
        steps.value.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return {
      barChart,
      fileTrayStacked,
      fastFood,
      steps,
      scrollToSteps,
    };
  },
};
</script>

<style scoped>
.btn {
  background-color: transparent;
  border: solid white 3px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background-color: white;
  color: rgb(40, 42, 38);
}

.page-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

ion-content {
  flex: 1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  width: 150px;
  margin: 7px;
}

.buttons {
  display: flex;
  gap: 5px;
  margin: 7px;
}

.login, .signup {
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  border-color: rgb(51, 53, 49);
  font-weight: bold;
  box-shadow: 1px 1px 4px rgb(133, 154, 109);
  transition: all 0.3s ease-in-out;
}

.login:hover {
  background-color: rgb(151, 173, 127);
  border-color: rgb(133, 154, 109);
}

.signup:hover {
  background-color: rgb(40, 42, 38);
}

.login {
  border-color: rgb(124, 144, 103);
  margin-right: 10px;
}

.signup {
  background-color: rgb(51, 53, 49);
  color: rgb(163, 184, 141);
  margin-right: 10px;
}

.main-image-container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.main-image-container img {
  max-width: 100%;
  height: auto;
}

.text-overlay {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

h1 {
  font-size: 50px;
}

p {
  margin-top: 10px;
}

.steps {
  margin-top: 25%;
  text-align: center;
}

.steps-row {
  justify-content: center; /* Center the row content */
}

.step-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px; /* Adjust this value as needed to make the columns narrower */
  margin: 0 10px; /* Add space between columns */
}

.step-icon {
  font-size: 3em;
  color: #4caf50;
}

.step-title {
  margin-top: 10px;
  font-size: 1.2em;
  color: #333;
}

.step-description {
  font-size: 1em;
  color: #333;
  text-align: center;
  margin: 0 90px;
}

.footer {
  background-color: #E9EAE8;
  padding: 20px;
  margin-bottom: 30px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 10px;
}

.footer-column {
  flex: 1;
  min-width: 200px;
  margin: 10px;
}

.footer-logo img {
  width: 100px;
}

.footer-description {
  margin-top: 10px;
  color: #555;
}

.footer-column h4 {
  margin-bottom: 15px;
}

.footer-column ul {
  list-style-type: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: #333;
  text-decoration: none;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 10px;
}
</style>
