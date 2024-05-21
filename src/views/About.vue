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
        </div>
      </ion-toolbar>
    </ion-header>

    <div class="page-content">
      <ion-content>
        <!-- Main Image -->
        <div class="main-image-container">
          <div class="text-overlay">
            <h1 style="color: rgb(51, 53, 49)"><b>About Us</b></h1>
          </div>
        </div>

        <!-- Privacy Policy Card -->
        <ion-card class="policy-card">
          <ion-card-header>
            <ion-card-title>SavEat Website and Mobile Application</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              Food waste is a global problem that isn’t being discussed enough. Unbeknownst to many, it contributes to 8-10% of global
              carbon emissions, with 61% of this coming from households (World Economic Forum, 2021). It also contributes to around 26% of
              greenhouse gas emissions (Ritchie, Hannah, 2020). In the Philippines, the capital region alone generates an estimated 2,000
              tons or 2 million kilograms of food waste daily (Philippine Institute for Development Studies, 2021).
            </p>
            <br />
            <p>
              SavEat is a website and mobile application that encourages maximizing and reducing food wastage through tracking its
              inventory, store dates, expiration dates along with other functionalities like keeping tabs of usage reports, restock reports
              and searching of food recipes through an API called Spoonacular. This application is a step forward in handling food waste
              along with its inventory and report tracking.
            </p>
            <br />
            <p>
              In data gathering, saveat is inspired by Silliman University’s Nutrition and Dietetics bar and snack shop’s current system.
              Based on an interview with the head-in-charge of the bar and snack shop, Sir Mark Genove, pointed out that having a restock
              and usage report would be a good idea for this project in order to cater the needs for the bar and snack shop. He also
              stressed that daily and usage reports were always so confusing and time consuming to his students because of the unclear setup
              they have between paper and Microsoft’s excel Software. The objective of this project is to let the users list and track their
              food while having reports whenever using or restocking will be done.
            </p>
            <br />
            <br />
            <p>Thank you for joining us in our journey!</p>
          </ion-card-content>
        </ion-card>
      </ion-content>

      <!-- Footer -->
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
  import { IonPage, IonHeader, IonToolbar, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

  export default {
    name: 'HomePage',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
    },
  };
</script>

<style scoped>
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

  .main-image-container {
    width: 100%;
    height: 200px;
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
    bottom: 20px;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0);
    text-align: center;
    color: white;
  }

  .policy-card {
    margin-top: -10px; /* Brings the card closer to the title */
  }

  h1 {
    font-size: 50px;
  }

  h3 {
    color: rgb(51, 53, 49); /* Darker text color for headings */
  }

  p,
  li {
    color: rgb(51, 53, 49); /* Darker text color for paragraph and list items */
  }

  .footer {
    background-color: #e9eae8;
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
