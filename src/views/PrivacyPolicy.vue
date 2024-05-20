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
              <h1 style="color: rgb(51, 53, 49)"><b>PRIVACY POLICY</b></h1>
            </div>
          </div>
  
          <!-- Privacy Policy Card -->
          <ion-card class="policy-card">
            <ion-card-header>
              <ion-card-title>SavEat Website and Mobile Privacy Policy</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>
                SavEat company follows the Data Privacy Act of 2012 (RA 10173). The sole reason of having these protocols is to set boundaries when it comes to data being handled, collected, and used. SavEat will use the data wisely and reassures that data will be protected through management and encryption. This also reassures that data will be used responsibly and with consent.
              </p>
              <h3>Coverage</h3>
              <ul>
                <li>People who are registered in the SavEat system will need to comply with these rules given by the SavEat Company.</li>
                <li>SavEat Services: Inventory System, Stock Report, Expiration Report, and Cost Report.</li>
              </ul>
              <h3>Purpose for Processing Information</h3>
              <p>
                On SavEat Website and Mobile application, this tackles the food waste crisis that the world is experiencing today. This application tracks the expiration date and can be also used as an inventory, stock, and cost report tracker. This is to help eliminate the said crisis being mentioned, food waste. In order to carry this operation SavEat company needs specific information that may or may not be unique to an individual.
              </p>
              <ul>
                <li>User Data Collection</li>
                <li>Food Data Collection</li>
                <li>Food Data Report</li>
                <li>Cost Data Report</li>
              </ul>
              <h3>Personal Information and Company’s Data on Supply and Inventory Collection and Processed</h3>
              <p>
                Personal Information includes First Name, Last Name, Email, and Password. For consent purposes, SavEat mandates the users accepting the email confirmation as a sign of consent when the system is handling their data.
              </p>
              <p>
                These differ based on the kind of data processed, the reason it is collected, and the amount of time needed to accomplish it.
              </p>
              <h3>Data Collection</h3>
              <p>
                <strong>1. Register and Email Confirmation</strong><br />
                SavEat system asks the user to input the First Name, Last Name, Email, and the password. The register confirmation is sent through email so that the users are aware of the registration that has their personal data. Passwords are protected through the system’s encryption feature.
              </p>
              <p>
                <strong>2. Food Data Collection</strong><br />
                For food data collection these are, food name, food type, store date, expiration date, price, and quantity.
              </p>
              <h3>Data Use</h3>
              <p>
                These data are collected by SavEat Company for the sole purpose of giving the users the best experience. For reassurance, only the data needed are being collected and being used. 
                User’s data are collected for the registration of account. Each individual that registers into the system will have their own personal account where they can manipulate all of their data being registered into the system.
                Food Data Collection are the basis of the application’s purpose and is needed in the system as this is input basis.
              </p>
              <h3>Storage Information</h3>
              <p>
                All data being collected in the system are being stored in a database that is cloud-based. This database is known as Supabase where it also promotes data encryption and email confirmation as a consent. 
                In the cloud, roles are being implemented in order to have different types of access controls. This ensures that insider attacks are not highly likely to happen as SavEat Company is strict about who is able to manipulate and manage the data.
              </p>
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
  
  p, li {
    color: rgb(51, 53, 49); /* Darker text color for paragraph and list items */
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
  