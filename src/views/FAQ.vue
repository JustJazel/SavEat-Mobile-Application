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
            <img src="@assets/images/home.jpg" alt="Main Image" />
            <div class="text-overlay">
              <h1><b>FREQUENTLY ASKED QUESTIONS</b></h1>
            </div>
          </div>
  
          <!-- ACCORDION -->
          <ion-accordion-group expand="inset">
            <ion-accordion value="first">
              <ion-item slot="header" color="light">
                <ion-label>What is Saveat?</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content"> Saveat is a platform designed to help you track food inventory, manage store and expiration dates, generate organized usage and restock reports, and discover recipes to minimize food waste.</div>
            </ion-accordion>
            <ion-accordion value="second">
              <ion-item slot="header" color="light">
                <ion-label> How do I track my food inventory with Saveat?</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content"> Saveat allows you to easily monitor all your food items. Simply enter the details of your food items, including store dates and expiration dates, into the app, and it will keep track of everything for you.</div>
            </ion-accordion>
            <ion-accordion value="third">
              <ion-item slot="header" color="light">
                <ion-label> Can Saveat help me generate reports?</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">Yes, Saveat enables you to create clear and organized usage and restock reports. These reports provide a comprehensive overview of your food inventory, helping you make informed decisions about your food consumption.</div>
            </ion-accordion>
            <ion-accordion value="fourth">
              <ion-item slot="header" color="light">
                <ion-label>What is the Spoonacular API, and how does it work with Saveat?</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">The Spoonacular API is a service that provides access to a large database of recipes. Saveat integrates with Spoonacular to offer you recipe suggestions based on the ingredients you have on hand, helping you utilize everything in your pantry efficiently.</div>
            </ion-accordion>
            <ion-accordion value="fifth">
              <ion-item slot="header" color="light">
                <ion-label>Can Saveat send me notifications about expiring items?</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">Yes, Saveat can send you notifications about items that are approaching their expiration dates, helping you use them in time and reduce waste.</div>
            </ion-accordion>
          </ion-accordion-group>
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
  import { IonPage, IonHeader, IonToolbar, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';
  import { ref } from 'vue';
  import '@assets/images/home.jpg';
  import '@assets/images/LogoSav1.png';
  
  export default {
    name: 'HomePage',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonContent,
      IonAccordionGroup,
      IonAccordion,
      IonItem,
      IonLabel,
    },
    setup() {
      const steps = ref(null);
  
      return {
        steps,
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
  
  .main-image-container {
    width: 100%;
    height: 200px; /* Adjusted height */
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
    bottom: 20px; /* Adjusted to move closer to the bottom */
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    color: white;
  }
  
  h1 {
    font-size: 50px;
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
  