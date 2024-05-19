<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Profile</ion-title>
      </ion-toolbar>

      <!-- Cover Photo -->
      <div class="cover-photo">
        <img src="/src/assets/images/saveatCover.jpg" alt="Cover Photo" />
        <div class="cover-ph"></div>
      </div>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <div class="profile-container">
        <ion-icon size="Large" :icon="personCircleOutline"></ion-icon>
        <!-- <div class="profile-icon">
          <img src="/src/assets/images/saveatIcon.png" alt="Custom Icon" class="user-icon" />
        </div> -->
        <ion-title v-html="userGreeting"></ion-title>
      </div>

      <!-- Fields -->
      <section>
        <ion-item>
          <ion-label position="floating">First Name</ion-label>
          <ion-input v-model="userForm.firstName"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Last Name</ion-label>
          <ion-input v-model="userForm.lastName"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" v-model="userForm.email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input type="password" placeholder="Enter new password" v-model="userNewPassword"></ion-input>
        </ion-item>
      </section>

      <!-- Save and Delete buttons -->
      <ion-grid class="button-grid">
        <ion-row>
          <ion-col>
            <ion-button size="default" @click="updateUserProfile">Save</ion-button>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-button color="danger" @click="deleteAccount">Delete Account</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonGrid,
    IonCol,
    IonRow,
    IonTitle,
    toastController,
    menuController,
  } from '@ionic/vue';
  import { ref, reactive, onMounted } from 'vue';
  import { useIonRouter } from '@ionic/vue';
  import { UserAttributes } from '@supabase/supabase-js';
  import { supabase } from '../supabase';
  import { useUserStore, IUser } from '../store';
  import { personCircleOutline } from 'ionicons/icons';
  import { Tabs } from '../models/constants';

  const userStore = useUserStore();
  const router = useIonRouter();

  const userGreeting = ref('');
  const userNewPassword = ref('');

  const userForm: Partial<IUser | null> = reactive({
    ...userStore.getUser,
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
      return;
    }

    userStore.setUser({
      uuid: session.user.id,
      email: session.user.email,
      firstName: session.user.user_metadata.first_name,
      lastName: session.user.user_metadata.last_name,
    });
  });

  const initData = () => {
    userGreeting.value = `Hello, ${userStore.getUserFullName}<br>Email: ${userStore.getUser?.email ?? 'N/A'}`;
  };

  onMounted(initData);

  const updateUserProfile = async () => {
    if (!userStore.getUser) {
      console.error('User not authenticated');
      return;
    }

    try {
      let userAttributes: UserAttributes = {
        email: userForm.email,
        data: {
          first_name: userForm.firstName?.trim(),
          last_name: userForm.lastName?.trim(),
        },
      };

      const toast = await toastController.create({});

      if (userNewPassword.value.trim().length) {
        userAttributes.password = userNewPassword.value;
      }

      const { data, error } = await supabase.auth.updateUser(userAttributes);

      if (error) {
        toast.message = 'Error saving user data.';
        toast.color = 'danger';
        await toast.present();
        console.error('Error saving user:', error.message);
        return;
      }

      toast.message = 'User saved successfully.';
      toast.color = 'success';
      await toast.present();

      // If password is changed, log out the user
      if (userNewPassword.value.trim().length) {
        await logout();
        window.location.reload();
      }
    } catch (error: any) {
      console.error('An Error Occurred:', error.message);
    }
  };

  const deleteAccount = async () => {
    if (!userStore.getUser) {
      console.error('User not authenticated');
      return;
    }

    try {
      const confirm = window.confirm('This will delete your account permanently and cannot be undone. Press confirm to continue.');

      if (!confirm) {
        return;
      }

      // Delete the account
      const { data, error } = await supabase.auth.admin.deleteUser(userStore.getUser.uuid);

      if (error) {
        if (error.message.includes('401')) {
          console.error('Unauthorized error: User not allowed to perform the delete operation.');
        } else {
          console.error('Error deleting user:', error.message);
        }
        return;
      }

      console.log('User deleted successfully:', data);

      // Log out the user
      await logout();

      window.location.reload();
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('logout ~ error. Will redirect to /login view:', error);
      router.push({ path: '/login', replace: true });
      return;
    }

    console.log('User Logged Out.');

    userStore.$reset();
    console.log('userStore Food Entries: ', userStore.getFoodEntries);

    await menuController.close();
    router.push({ path: '/login', replace: true });
  };

  const goBack = () => {
    router.back();
  };
</script>

<style scoped>
  ion-icon {
    font-size: 38px; /* You can adjust this value as needed */
  }
  .cover-photo {
    width: 100%;
    height: 90px;
    overflow: hidden;
  }

  .cover-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
  }

  .profile-icon {
    margin-right: 5px;
  }

  .user-icon {
    width: 100px;
    height: 100px;
    border-radius: 20%;
  }

  .button-grid {
    margin-top: 20px;
  }
</style>
