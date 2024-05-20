<template>
    <ion-page>
        <Toolbar />
        <ion-content id="main-content">
            <!-- Main Container -->
            <div class="container" style="margin-top: 10px;">
                <!-- Basic Information Section -->
                <ion-card class="basic-information">
                    <ion-card-header>
                        <ion-card-title>Basic Information</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-item>
                            <ion-label position="stacked">Food Name</ion-label>
                            <ion-input :disabled="!isEditable" placeholder="Enter food name"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Food Type</ion-label>
                            <ion-select :disabled="!isEditable" placeholder="Select type">
                                <ion-select-option value="processed">Processed</ion-select-option>
                                <ion-select-option value="perishable">Perishable</ion-select-option>
                            </ion-select>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Item Notes</ion-label>
                            <ion-textarea :disabled="!isEditable" placeholder="Item description" style="height: 300px;"></ion-textarea>
                        </ion-item>

                        <ion-button expand="block" style="margin-top: 25px;" @click="toggleEdit">Edit</ion-button>
                        <ion-button expand="block" style="margin-top: 10px;">Back</ion-button>
                    </ion-card-content>
                </ion-card>

                <!-- Quantity & Cost Section -->
                <ion-card class="quantity-cost">
                    <ion-card-header>
                        <ion-card-title>Quantity & Cost</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-item>
                            <ion-label position="stacked">In Stock</ion-label>
                            <ion-input :disabled="!isEditable" type="number" placeholder="Enter quantity"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Minimum Level</ion-label>
                            <ion-input :disabled="!isEditable" type="number" placeholder="Enter minimum level"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Unit Price</ion-label>
                            <ion-input :disabled="!isEditable" type="number" placeholder="Enter unit price"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Unit Cost</ion-label>
                            <ion-input :disabled="!isEditable" type="number" placeholder="Enter unit cost"></ion-input>
                        </ion-item>
                    </ion-card-content>
                </ion-card>

                <!-- Dates Section -->
                <ion-card class="date-information">
                    <ion-card-header>
                        <ion-card-title>Dates</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <!-- Store Date -->
                        <ion-item class="food-entries__date-item">
                            <ion-label position="stacked">Store Date</ion-label>
                            <ion-datetime-button :disabled="!isEditable" id="store-date-button" datetime="store-datetime"></ion-datetime-button>
                            <ion-modal keep-contents-mounted="true">
                                <ion-datetime id="store-datetime" presentation="date"></ion-datetime>
                            </ion-modal>
                        </ion-item>
                        <!-- Expiry Date -->
                        <ion-item class="food-entries__date-item">
                            <ion-label position="stacked">Expiry Date</ion-label>
                            <ion-datetime-button :disabled="!isEditable" id="expiry-date-button" datetime="expiry-datetime"></ion-datetime-button>
                            <ion-modal keep-contents-mounted="true">
                                <ion-datetime id="expiry-datetime" presentation="date"></ion-datetime>
                            </ion-modal>
                        </ion-item>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonSelect, 
    IonSelectOption, 
    IonTextarea, 
    IonDatetime, 
    IonFab, 
    IonFabButton, 
    IonIcon, 
    IonDatetimeButton,
    IonModal 
} from '@ionic/vue';

export default defineComponent({
    components: { 
        IonCard, 
        IonCardContent, 
        IonCardHeader, 
        IonCardTitle, 
        IonItem, 
        IonLabel, 
        IonInput, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea, 
        IonDatetime, 
        IonFab, 
        IonFabButton, 
        IonIcon, 
        IonDatetimeButton, 
        IonModal
    },
    setup() { //Input fields are supposed to be editable once pressing the edit button. broken atm
        const isEditable = ref(false);

        const toggleEdit = () => {
            isEditable.value = !isEditable.value;
        };

        return {
            isEditable,
            toggleEdit
        };
    }
});
</script>

<style scoped>
.container {  
    display: grid;
    grid-template-columns: 1fr 1fr 0fr;
    grid-template-rows: 1fr 0.7fr 0fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
        "basic-information quantity-cost ."
        "basic-information date-information ."
        ". . .";
}

.basic-information { grid-area: basic-information; }
.quantity-cost { grid-area: quantity-cost; }
.date-information { grid-area: date-information; }

ion-card {
    margin: 16px;
}
ion-fab-button {
    --ion-background-color: #3880ff;
    --ion-color: #ffffff;
}

.food-entries__date-item ion-datetime-button {
    --padding-start: 0px;
    --padding-end: 0px;
    margin-top: 20px;
}
</style>
