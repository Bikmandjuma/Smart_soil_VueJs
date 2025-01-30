<template>
  <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center justify-center items-center">
    <div class="text-center">
      <!-- Profile Image -->
      <img
        class="rounded-full w-32 h-32 mx-auto"
        :src="userData.image_url ? userData.image_url : require('../../assets/Manager_style/images/user.png')"
        alt="User Image"
      />
      <h5 class="font-semibold text-lg mt-4">{{ editData.firstname || 'User Name' }}</h5>
      <p class="text-gray-600 mt-2">{{ editData.lastname || 'N/A' }}</p>
      <button @click="openModal" class="text-blue-500 mt-4 text-sm">Edit Profile</button>
    </div>
  </div>

  <div class="image-cropper">
    <div v-if="image" class="cropper-container">
      <img ref="imageElement" :src="image" alt="Image to Crop" />
    </div>
    <div v-else>
      <input type="file" @change="onFileChange" />
    </div>

    <button v-if="image" @click="cropImage">Crop Image</button>

    <!-- Show loading indicator -->
    <div v-if="loading" class="loading-indicator">
      <p>Uploading...</p>
    </div>

    <button v-if="croppedImage" @click="uploadImage" :disabled="loading">Save Cropped Image</button>

    <div v-if="croppedImage" class="cropped-image">
      <img :src="croppedImage" alt="Cropped Image" />
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { laravelApiUrl } from '../../api';
import axios from 'axios';

export default {
  data() {
    return {
      image: null,
      croppedImage: null,
      cropper: null,
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
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
        this.$nextTick(() => {
          this.initializeCropper();
        });
      }
    },
    initializeCropper() {
      const imageElement = this.$refs.imageElement;
      this.cropper = new Cropper(imageElement, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        scalable: true,
      });
    },
    cropImage() {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      this.croppedImage = croppedCanvas.toDataURL();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    uploadImage() {
      this.loading = true; // Show loading indicator

      const formData = new FormData();
      const fileName = 'cropped_image.png';

      // Convert base64 to file
      const base64Data = this.croppedImage.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArrays], { type: 'image/png' });
      formData.append('image', blob, fileName);
      const token = localStorage.getItem('auth_token');

      // Send the image to the Laravel API
      axios
        .post(`${laravelApiUrl}/user/uploadImage`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('Image uploaded successfully', response.data);
          this.userData.image_url = response.data.image_url;
          setTimeout( ()=>{
            this.loading = false;
          },5000);
          
        })
        .catch((error) => {
          console.error('Image upload failed', error);
          this.loading = false; // Hide loading indicator if error occurs
        });
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
