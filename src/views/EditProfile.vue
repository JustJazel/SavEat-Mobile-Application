<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>

      <!-- Cover Photo -->
      <div class="cover-photo">
        <!-- Your cover photo content goes here -->
        <img src="/src/assets/images/saveatCover.jpg" alt="Cover Photo" />
        <div class="cover-ph"></div>
      </div>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <div class="profile-container">
        <div class="profile-icon">
          <img src="/src/assets/images/saveatIcon.png" alt="Custom Icon" class="user-icon" />
        </div>
        <ion-title v-html="userGreeting"></ion-title>
      </div>
      <!-- Other content goes here -->
      <!-- These are the fields -->
      <section>
        <!-- Enter fields here -->
        <!-- First Name -->
        <ion-item>
          <ion-label position="floating">First Name</ion-label>
          <ion-input v-model="userForm.firstName"></ion-input>
        </ion-item>

        <!-- Last Name -->
        <ion-item>
          <ion-label position="floating">Last Name</ion-label>
          <ion-input v-model="userForm.lastName"></ion-input>
        </ion-item>

        <!-- Email -->
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" v-model="userForm.email"></ion-input>
        </ion-item>

        <!-- Password -->
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
          <!--   <ion-col class="ion-text-end">
            <ion-button color="danger" @click="deleteAccount">Delete Account</ion-button>
          </ion-col>-->
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
  } from '@ionic/vue';
  import { ref, reactive, onMounted } from 'vue';
  import { useIonRouter } from '@ionic/vue';
  import { UserAttributes } from '@supabase/supabase-js';
  import { supabase } from '../supabase';
  import { useUserStore, IUser } from '../store';

  const userStore = useUserStore();
  const router = useIonRouter();
  //test

  const userGreeting = ref('');
  const userNewPassword = ref('');

  const userForm: Partial<IUser | null> = reactive({
    ...userStore.getUser,
  });

  // Handle changes in authentication state
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
    // Update currentUser to display the desired greeting with email and password on separate lines
    userGreeting.value = `Hello, ${userStore.getUserFullName}<br>Email: ${userStore.getUser?.email ?? 'N/A'}`;
  };

  // Fetch user details on component mount
  onMounted(initData);

  // TODO: Move to a service
  const updateUserProfile = async () => {
    // Check if the user is authenticated
    if (!userStore.getUser) {
      console.error('User not authenticated');
      return;
    }

    try {
      // Update user data in the database
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

      console.log('Response from Supabase:', data, error);

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

      console.log('Updated User successfully:', data);
    } catch (error: any) {
      console.error('An Error Occurred:', error.message);
    }
  };

  // TODO: Move to a service
  const deleteAccount = async () => {
    // Check if the user is authenticated
    if (!userStore.getUser) {
      console.error('User not authenticated');
      return;
    }

    console.log('Deleting user with ID:', userStore.getUser.uuid);

    try {
      // Perform the deletion of the user account using supabase.auth.admin.deleteUser
      const { data, error } = await supabase.auth.admin.deleteUser(userStore.getUser.uuid);

      console.log('Response from Supabase:', data, error);

      if (error as unknown as any) {
        if (error?.message && error.message.includes('401')) {
          console.error('Unauthorized error: User not allowed to perform the delete operation.');
        } else {
          console.error('Error deleting user:', error?.message);
        }
        return;
      }

      console.log('User deleted successfully:', data);

      // TODO: Handle logout for token, and remove session.
      router.push({ name: 'login' });
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  // Go back method
  const goBack = () => {
    // Use router to navigate back to the desired route
    router.back();
  };
</script>

<style scoped>
  .cover-photo {
    width: 100%;
    height: 90px;
    /* Adjust the height as needed */
    overflow: hidden;
  }

  .cover-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Ensures the image covers the entire container */
  }

  .profile-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    /* Add padding as needed */
  }

  .profile-icon {
    margin-right: 5px;
    /* Adjust the margin as needed */
  }

  .user-icon {
    width: 100px;
    /* Adjust the width as needed */
    height: 100px;
    /* Adjust the height as needed */
    border-radius: 20%;
    /* Optional: If you want a circular icon */
  }

  .button-grid {
    margin-top: 20px;
  }
</style>
