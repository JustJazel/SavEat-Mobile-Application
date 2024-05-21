<template>
  <ion-page class="login">
    <ion-header>
      <ion-toolbar>
        <ion-title>Login Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list :inset="true">
        <div class="login__logo">
          <router-link to="/home" class="logo-link">
            <img src="@/assets/images/LogoSav.png" alt="logo" />
          </router-link>
        </div>
        <form @submit.prevent="login" class="login__form">
          <ion-item>
            <ion-input label-placement="stacked" label="Email" v-model="email" name="email" autocomplete="on" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label-placement="stacked" label="Password" v-model="password" name="password" type="password"></ion-input>
          </ion-item>
          <ion-item></ion-item>

          <div class="login__form-submit ion-text-center">
            <ion-button type="submit" fill="solid">Login</ion-button>
            <router-link to="/register" style="color: blue">
              <a style="color: blue">New User? Register here</a>
            </router-link>
          </div>
          <ion-label class="login__form-submit ion-text-center">
            Need help with your account? contact:
            <a href="mailto:saveatapp@gmail.com" style="color: blue">saveatapp@gmail.com</a>
          </ion-label>
        </form>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
  .login {
    &__logo {
      display: flex;
      justify-content: center;
      margin: 2rem auto;
      max-width: 600px; /* Increase max-width for larger container */

      .logo-link {
        display: block;
      }

      img {
        max-width: 100%; /* Adjust max-width to be 100% of the container */
        object-fit: contain;
        width: 100%;
      }
    }

    &__form-submit {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;

      a {
        margin-top: 1rem;
      }
    }
  }
</style>

<script lang="ts" setup>
  import { supabase } from '../supabase';
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    toastController,
    IonLabel,
  } from '@ionic/vue';
  import { ref } from 'vue';
  import { useIonRouter } from '@ionic/vue';
  import { useUserStore } from '../store';

  const email = ref('');
  const password = ref('');
  const ionRouter = useIonRouter();
  const userStore = useUserStore();

  async function login(): Promise<void> {
    const toast = await toastController.create({
      message: '',
      duration: 3000,
    });

    //TODO:fix error after register
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.log('login ~ error:', error);
      toast.message = 'Login Failed.';
      toast.color = 'danger';
      toast.present();
      return;
    }

    if (data) {
      userStore.setUser({
        uuid: data.user.id,
        email: data.user.email ?? '',
        firstName: data.user.user_metadata.first_name,
        lastName: data.user.user_metadata.last_name,
      });

      toast.message = 'Logged in as ' + data.user.email;
      toast.present();

      ionRouter.navigate({ path: '/tabs', replace: true });
    }
  }
</script>
