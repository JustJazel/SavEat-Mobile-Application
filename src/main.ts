import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { IonicVue } from '@ionic/vue';

// Import Toolbar component
import Toolbar from './views/components/Toolbar.vue';

// Components
import { 
  IonApp,
  IonRouterOutlet,
  IonPage, 
  IonTitle, 
  IonCardTitle, 
  IonBackButton, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonIcon, 
  IonButtons, 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonToolbar, 
  IonHeader, 
  IonCardSubtitle, 
  IonCardHeader, 
  IonImg, 
  IonAvatar, 
  IonMenu,
  IonList,
  IonItem 
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/display.css';

/* Mobile to Web */
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import './registerServiceWorker';

const pinia = createPinia();

const app = createApp(App).use(IonicVue).use(router).use(pinia);

// Register Toolbar component globally
app.component('Toolbar', Toolbar);

// Register Ionic components globally
app.component('ion-app', IonApp);
app.component('ion-router-outlet', IonRouterOutlet);
app.component('ion-page', IonPage);
app.component('ion-content', IonContent);
app.component('ion-grid', IonGrid);
app.component('ion-row', IonRow);
app.component('ion-col', IonCol);
app.component('ion-icon', IonIcon);
app.component('ion-buttons', IonButtons);
app.component('ion-button', IonButton);
app.component('ion-card', IonCard);
app.component('ion-card-content', IonCardContent);
app.component('ion-back-button', IonBackButton);
app.component('ion-title', IonTitle);
app.component('ion-card-title', IonCardTitle);
app.component('ion-toolbar', IonToolbar);
app.component('ion-header', IonHeader);
app.component('ion-card-subtitle', IonCardSubtitle);
app.component('ion-card-header', IonCardHeader);
app.component('ion-img', IonImg);
app.component('ion-avatar', IonAvatar);
app.component('ion-menu', IonMenu);
app.component('ion-list', IonList);
app.component('ion-item', IonItem);

router.isReady().then(() => {
  app.mount('#app');
});

defineCustomElements(window); //idk what is this
