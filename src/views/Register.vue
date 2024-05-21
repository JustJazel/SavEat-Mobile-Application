<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Register Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list :inset="true">
        <div class="login__logo">
          <router-link to="/home" class="logo-link">
            <img src="@/assets/images/LogoSav.png" alt="logo" />
          </router-link>
        </div>
        <form @submit.prevent="createAccount">
          <ion-item>
            <ion-input label-placement="stacked" label="First Name" v-model="user.firstName" name="first-name" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label-placement="stacked" label="Last Name" v-model="user.lastName" name="last-name" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label-placement="stacked" label="Email" v-model="user.email" name="email" autocomplete="on" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label-placement="stacked" label="Password" v-model="user.password" name="password" type="password"></ion-input>
          </ion-item>
          <ion-item></ion-item>

          <div class="form__submit ion-text-center">
            <ion-button type="submit" fill="solid">Register Account</ion-button>
            <router-link to="/login" style="color: blue">
              <a style="color: blue">Already have an account? Login here</a>
            </router-link>
          </div>
        </form>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
  .login__logo {
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

  .form__submit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    a {
      margin-top: 1rem;
    }
  }
</style>

<script lang="ts" setup>
  import { supabase } from '../supabase';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, toastController } from '@ionic/vue';
  import { reactive } from 'vue';
  import { useIonRouter } from '@ionic/vue';

  const router = useIonRouter();

  interface IUserRegistration {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  const user = reactive<IUserRegistration>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  async function createAccount(): Promise<void> {
    const toast = await toastController.create({
      message: '',
      duration: 3000,
    });

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
        },
      },
    });

    if (error) {
      toast.message = 'Failed to Create Account.';
      toast.color = 'danger';
      await toast.present();
      console.error('Create Account Error: ' + error);
    } else {
      toast.message = `An email verification has been sent for ${data?.user?.email} to complete the registration.`;
      toast.color = 'success';
      await toast.present();
      router.push('/login');
    }
  }
</script>
