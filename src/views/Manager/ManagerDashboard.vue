<template>
  <!-- Content -->
  <div class="mt-2">
    <!-- State cards -->
    <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
      <!-- Value card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div class="text-center">
          <p class="text-md font-medium leading-none tracking-wider text-gray-500 dark:text-primary-light">
            N, P, K, pH
          </p>
          <span class="text-xl font-semibold">{{ cropInputs.N }}, {{ cropInputs.P }}, {{ cropInputs.K }}, {{ cropInputs.pH }}</span>
        </div>
        <div>
          <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
        </div>
      </div>

      <!-- Temperature card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div>
          <h6 class="text-xl font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
            Temperature
          </h6>
          <span class="text-md font-semibold">{{ cropInputs.temperature }}</span>
        </div>
        <div>
          <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
        </div>
      </div>

      <!-- Soil Moisture card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div>
          <h6 class="text-md font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
            Soil Moisture
          </h6>
          <span class="text-xl font-semibold">{{ cropInputs.soil_moisture }}</span>
        </div>
        <div>
          <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
        </div>
      </div>

      <!-- Conductivity card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div>
          <h6 class="text-md font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
            Conductivity
          </h6>
          <span class="text-xl font-semibold">{{ cropInputs.conductivity }}</span>
        </div>
        <div>
          <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
        </div>
      </div>
    </div>

    <!-- Crop Prediction Result -->
    <div class="flex flex-wrap mt-3">
      <!-- <div class="w-full xl:w-1/4 mb-4"></div> -->

      <div class="w-full xl:w-2/2 mb-4">
      <div class="card border rounded-lg shadow-md">
        <div class="card-body pt-3 text-center"  style="overflow-x: scroll;">
          <h3 v-if="isLoading" class="text-blue-600 font-bold">Loading...</h3>

          <template v-if="!isLoading">
            <h3 v-if="!isInvalid">
              Recommended Crop is <span class="font-bold text-blue-600">{{ prediction.most_probable_crop }}</span>
            </h3>
            <p v-if="!isInvalid" class="text-gray-500">Prediction Probabilities:</p>
            <ul v-if="!isInvalid">
              <table class="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead class="bg-gray-800 text-white">
                  <tr class="text-center">
                    <th class="py-3 px-4 text-center">N<sup>o</sup></th>
                    <th class="py-3 px-4 text-center">Crop</th>
                    <th class="py-3 px-4 text-center">Prediction</th>
                    <th class="py-3 px-4 text-center">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(prob, crop, index) in prediction.predicted_probabilities[0]" :key="crop" class="hover:bg-gray-100 transition duration-200">
                    <td class="py-3 px-4 text-center">{{ count_crop + index }}</td>
                    <td class="py-3 px-4">{{ crop }}</td>
                    <td class="py-3 px-4">{{ prob }}</td>
                    <td class="py-3 px-4">{{ (prob * 100).toFixed(0) }}%</td>
                  </tr>
                </tbody>
              </table>
            </ul>
            <h3 v-if="isInvalid" class="text-red-600 font-bold">
              No crop is recommended for the given conditions.
            </h3>
            <p v-if="isInvalid" class="text-gray-500" style="font-size:20px;">
              The environment is unsuitable for farming.
            </p>
          </template>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { laravelApiUrl,flaskApiUrl } from "../../api";

export default {
  name: "ManagerDashboard",
  data() {
    return {
      count_crop:0,
      isLoading: true,
      isInvalid: false,
      cropInputs: {
        N: 0, P: 0, K: 0, pH: 0,
        temperature: 0, soil_moisture: 0,
        conductivity: 0
      },
      prediction: {
        most_probable_crop: "Loading...",
        predicted_probabilities: { 0: {} }
      }
    };
  },
  methods: {
    
    async fetchCropInputs() {
      try {
        const response = await fetch(`${laravelApiUrl}/crop-getArduinoData`);
        const data = await response.json();
        this.cropInputs = data;
        this.checkInvalidConditions();
      } catch (error) {
        console.error("Error fetching crop inputs:", error);
      }
    },
    async fetchCropPrediction() {
      try {
        if (this.isInvalid) {
          this.prediction = {
            most_probable_crop: "N/A",
            predicted_probabilities: { 0: {} }
          };
          return;
        }
        const response = await fetch(`${flaskApiUrl}/crop_predicted`);
        const data = await response.json();
        this.prediction = data;
      } catch (error) {
        console.error("Error fetching crop prediction:", error);
      }
    },
    checkInvalidConditions() {
      const { N, P, K, temperature, soil_moisture, pH, conductivity } = this.cropInputs;

      this.isInvalid =
        (N == 0 && P == 0 && K == 0) ||
        temperature <= 0 ||
        soil_moisture < 0.05 ||
        pH < 4 || pH > 10 ||
        conductivity == 0;

      if (this.isInvalid) {
        this.prediction = {
          most_probable_crop: "No recommendation",
          predicted_probabilities: { 0: {} }
        };
      }
    }
  },
  mounted() {
    this.fetchCropInputs();
    this.fetchCropPrediction();
    this.count_crop++;
    setTimeout(() => {
      this.isLoading = false;  // Hide loading after 3 seconds
    }, 3000);

    setInterval(() => {
      this.fetchCropInputs();
      this.fetchCropPrediction();
    }, 5000);
    
  }

};
</script>
