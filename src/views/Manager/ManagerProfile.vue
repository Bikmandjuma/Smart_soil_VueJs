<template>
  <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center justify-center items-center">
    <div class="text-center">
      <!-- Profile Image -->
      <img
        class="rounded-full w-32 h-32 mx-auto"
        :src="require('../../assets/Manager_style/images/user.png')"
        alt="User Image"
      />
      <h5 class="font-semibold text-lg mt-4">{{ editData.firstname || 'User Name' }}</h5>
      <p class="text-gray-600 mt-2">{{ editData.lastname || 'N/A' }}</p>
      <button @click="openModal" class="text-blue-500 mt-4 text-sm">Edit Profile</button>
    </div>
  </div>
 
</template>

<script>
import 'cropperjs/dist/cropper.css';

export default {
  data() {
    return {
      image: null,
      loading: false, // For handling loading state
      isModalOpen: false, // For controlling modal visibility
      editData: {
        firstname: '',
        lastname: '',
      },
      userData: {
        image_url: '', // This will hold the image URL from Laravel
      },
    };
  },
  methods: {
   
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    
  },
};
</script>

<style scoped>
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #000;
}

.cropped-image img {
  max-width: 100%;
  height: auto;
}
</style>
