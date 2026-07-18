<template>
  <!-- Content -->
  <div class="mt-2">
    <!-- State cards -->
    <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
      <!-- Value card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div class="text-center">
          <p class="text-md font-medium leading-none tracking-wider text-gray-500 dark:text-primary-light">
            <span class="fa fa-flask text-blue-500 text-sm mr-1"></span>
            N, P, K, pH
          </p>
          <span class="text-xl font-semibold">{{ cropInputs.N }}, {{ cropInputs.P }}, {{ cropInputs.K }}, {{ cropInputs.pH }}</span>
        </div>
      </div>

      <!-- Temperature card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div>
          <h6 class="text-md font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
            <span class="fa fa-thermometer-half text-blue-500 text-sm mr-1"></span>
            Temperature
          </h6>
          <span class="text-md font-semibold">{{ cropInputs.temperature }}</span>
        </div>
      </div>

      <!-- Soil Moisture card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div>
          <h6 class="text-md font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
            <span class="fa fa-tint text-blue-500 text-sm mr-1"></span>
            Soil Moisture
          </h6>
          <span class="text-xl font-semibold">{{ cropInputs.soil_moisture }}</span>
        </div>
      </div>

      <!-- Conductivity card -->
      <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
        <div>
          <h6 class="text-md font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
            <span class="fa fa-bolt text-blue-500 text-sm mr-1"></span>
            Conductivity
          </h6>
          <span class="text-xl font-semibold">{{ cropInputs.conductivity }}</span>
        </div>
      </div>
    </div>

    <!-- Crop Prediction Result -->
    <div class="flex flex-wrap mt-3">
      <div class="w-full xl:w-2/2 mb-4">
        <div class="card border rounded-lg shadow-md">
          <div class="card-body pt-3 text-center" style="overflow-x: scroll;">
            <h3 v-if="isLoading" class="text-blue-600 font-bold">Loading...</h3>

            <template v-if="!isLoading">
              <h3 v-if="!isInvalid">
                Recommended Crop is <span class="font-bold text-blue-600">{{ prediction.most_probable_crop }}</span>
              </h3>
              <p v-if="!isInvalid" class="text-gray-500">Prediction Probabilities:</p>

              <table v-if="!isInvalid" class="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead class="bg-gray-800 text-white">
                  <tr class="text-center">
                    <th class="py-3 px-4 text-center">N<sup>o</sup></th>
                    <th class="py-3 px-4 text-center">Crop</th>
                    <th class="py-3 px-4 text-center">Prediction</th>
                    <th class="py-3 px-4 text-center">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in sortedProbabilities"
                    :key="row.crop"
                    :class="[
                      'transition duration-200',
                      row.crop === prediction.most_probable_crop
                        ? 'bg-blue-50 font-bold text-blue-700 border-l-4 border-blue-600'
                        : 'hover:bg-gray-100'
                    ]"
                  >
                    <td class="py-3 px-4 text-center">{{ count_crop + index }}</td>
                    <td class="py-3 px-4">
                      {{ row.crop }}
                      <span
                        v-if="row.crop === prediction.most_probable_crop"
                        class="ml-2 text-xs uppercase tracking-wide bg-blue-600 text-white rounded-full px-2 py-0.5"
                      >
                        Best match
                      </span>
                    </td>
                    <td class="py-3 px-4 text-center">{{ row.prob }}</td>
                    <td class="py-3 px-4 text-center">{{ (row.prob * 100).toFixed(0) }}%</td>
                  </tr>
                </tbody>
              </table>

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

      <!-- AI Agronomy Advice (fertilization, planting season, irrigation) -->
      <div v-if="!isLoading && !isInvalid" class="w-full mb-4">
        <div class="card border rounded-lg shadow-md">
          <div class="card-body pt-3 text-left">
            <h4 class="font-bold text-gray-700 mb-3">
              Agronomy advice for <span class="text-blue-600">{{ prediction.most_probable_crop }}</span>
            </h4>

            <p v-if="isLoadingAdvice" class="text-blue-600 font-medium">Fetching AI recommendations...</p>
            <p v-else-if="adviceError" class="text-red-600">{{ adviceError }}</p>

            <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div class="p-4 bg-gray-50 rounded-md">
                <h6 class="uppercase text-xs font-semibold text-gray-500 mb-2">Fertilization</h6>
                <p class="text-sm text-gray-700 whitespace-pre-line">{{ agronomyAdvice.fertilization || "N/A" }}</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-md">
                <h6 class="uppercase text-xs font-semibold text-gray-500 mb-2">Planting season</h6>
                <p class="text-sm text-gray-700 whitespace-pre-line">{{ agronomyAdvice.planting_season || "N/A" }}</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-md">
                <h6 class="uppercase text-xs font-semibold text-gray-500 mb-2">Irrigation schedule</h6>
                <p class="text-sm text-gray-700 whitespace-pre-line">{{ agronomyAdvice.irrigation || "N/A" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { laravelApiUrl, flaskApiUrl } from "../../api";

// Single source of truth for a "safe" empty prediction shape,
// so we never assign something that breaks the template's [0] access.
const EMPTY_PREDICTION = () => ({
  most_probable_crop: "N/A",
  predicted_probabilities: { 0: {} }
});

const EMPTY_ADVICE = () => ({
  fertilization: "",
  planting_season: "",
  irrigation: ""
});

export default {
  name: "ManagerDashboard",
  data() {
    return {
      count_crop: 1,
      isLoading: true,
      isInvalid: false,
      pollTimer: null,
      cropInputs: {
        N: 0, P: 0, K: 0, pH: 0,
        temperature: 0, soil_moisture: 0,
        conductivity: 0
      },
      prediction: {
        most_probable_crop: "Loading...",
        predicted_probabilities: { 0: {} }
      },
      agronomyAdvice: EMPTY_ADVICE(),
      isLoadingAdvice: false,
      adviceError: null,
      lastAdviceCrop: null,
      invalidStreak: 0,
      INVALID_THRESHOLD: 3,
      isPolling: false
    };
  },
  computed: {
    // Flattens predicted_probabilities[0] into an array of {crop, prob},
    // drops anything under 5% (not worth showing to the user), and sorts
    // from highest to lowest probability so the top row is always the
    // recommended crop.
    sortedProbabilities() {
      const raw = (this.prediction.predicted_probabilities && this.prediction.predicted_probabilities[0]) || {};
      return Object.entries(raw)
        .map(([crop, prob]) => ({ crop, prob }))
        .filter((row) => row.prob >= 0.05)
        .sort((a, b) => b.prob - a.prob);
    }
  },
  methods: {
    // Accepts several possible backend shapes (flat N/P/K/pH, flat
    // nitrogen/phosphorus/potassium/ph, or nested {soil: {...}} like the
    // ESP32 sketch sends) and maps them all onto the flat cropInputs shape
    // the template renders. This is what keeps the summary cards live
    // regardless of exactly how the Laravel endpoint names its fields.
    normalizeCropInputs(data) {
      if (!data || typeof data !== "object") {
        return this.cropInputs;
      }

      const soil = data.soil || {};
      const ambient = data.ambient || {};

      const pick = (...candidates) => {
        for (const value of candidates) {
          if (value !== undefined && value !== null) {
            return value;
          }
        }
        return 0;
      };

      return {
        N: pick(data.N, data.nitrogen, soil.nitrogen, this.cropInputs.N),
        P: pick(data.P, data.phosphorus, soil.phosphorus, this.cropInputs.P),
        K: pick(data.K, data.potassium, soil.potassium, this.cropInputs.K),
        pH: pick(data.pH, data.ph, soil.ph, this.cropInputs.pH),
        temperature: pick(data.temperature, soil.temperature, ambient.temperature, this.cropInputs.temperature),
        soil_moisture: pick(data.soil_moisture, data.moisture, soil.moisture, this.cropInputs.soil_moisture),
        conductivity: pick(data.conductivity, data.ec, soil.ec, this.cropInputs.conductivity)
      };
    },

    // True when two normalized cropInputs objects hold the same values —
    // used to skip a reactive update (and the re-render that comes with
    // it) when the Arduino hasn't actually pushed a new reading yet.
    isSameCropInputs(a, b) {
      return (
        a.N === b.N &&
        a.P === b.P &&
        a.K === b.K &&
        a.pH === b.pH &&
        a.temperature === b.temperature &&
        a.soil_moisture === b.soil_moisture &&
        a.conductivity === b.conductivity
      );
    },

    async fetchCropInputs() {
      try {
        // Real endpoint confirmed from your Laravel API — e.g.
        // http://192.168.1.65:8000/api/sensor-data/latest
        const response = await fetch(`${laravelApiUrl}/sensor-data/latest`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const normalized = this.normalizeCropInputs(data);

        // Nothing new from the Arduino this cycle — leave state untouched
        // so the cards don't re-render for an identical reading.
        if (this.isSameCropInputs(normalized, this.cropInputs)) {
          return;
        }

        this.cropInputs = normalized;
        this.checkInvalidConditions();
      } catch (error) {
        console.error("Error fetching crop inputs:", error);
      }
    },

    async fetchCropPrediction() {
      // Skip the network call entirely when conditions are already known
      // to be invalid — no point asking the model for a prediction.
      if (this.isInvalid) {
        if (this.prediction.most_probable_crop !== "N/A") {
          this.prediction = EMPTY_PREDICTION();
        }
        return;
      }

      try {
        const response = await fetch(`${flaskApiUrl}/crop_predicted`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();

        // Normalize the response so predicted_probabilities[0] is always
        // safe to read in the template, regardless of what the API sends back.
        const hasValidShape =
          data &&
          data.predicted_probabilities &&
          typeof data.predicted_probabilities[0] === "object";

        const nextPrediction = hasValidShape
          ? {
              most_probable_crop: data.most_probable_crop ?? "N/A",
              predicted_probabilities: data.predicted_probabilities
            }
          : EMPTY_PREDICTION();

        // Same crop, same probabilities as what's already on screen —
        // skip the reactive update so the table doesn't re-render for
        // a repeat result on this poll cycle.
        const unchanged =
          nextPrediction.most_probable_crop === this.prediction.most_probable_crop &&
          JSON.stringify(nextPrediction.predicted_probabilities) ===
            JSON.stringify(this.prediction.predicted_probabilities);

        if (!unchanged) {
          this.prediction = nextPrediction;
        }

        if (this.prediction.most_probable_crop && this.prediction.most_probable_crop !== "N/A") {
          await this.fetchAgronomyAdvice(this.prediction.most_probable_crop);
        }
      } catch (error) {
        console.error("Error fetching crop prediction:", error);
        if (this.prediction.most_probable_crop !== "N/A") {
          this.prediction = EMPTY_PREDICTION();
        }
      }
    },

    // Calls our Flask backend's /api/crop_agronomy_advice route, which
    // generates fertilization, planting season, and irrigation guidance
    // via Groq server-side. Skips the call if the crop hasn't changed
    // since the last successful fetch.
    async fetchAgronomyAdvice(crop) {
      if (crop === this.lastAdviceCrop) {
        return;
      }

      this.isLoadingAdvice = true;
      this.adviceError = null;

      try {
        const response = await fetch(
          `${flaskApiUrl}/crop_agronomy_advice?crop=${encodeURIComponent(crop)}`
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        this.agronomyAdvice = {
          fertilization: data.fertilization ?? "",
          planting_season: data.planting_season ?? "",
          irrigation: data.irrigation ?? ""
        };
        this.lastAdviceCrop = crop;
      } catch (error) {
        console.error("Error fetching agronomy advice:", error);
        this.adviceError = "Could not fetch agronomy advice right now.";
        this.agronomyAdvice = EMPTY_ADVICE();
      } finally {
        this.isLoadingAdvice = false;
      }
    },

    // A single noisy sensor read (e.g. a momentary Modbus glitch reporting
    // 0 for N/P/K, or a brief moisture dip) shouldn't wipe the prediction
    // and agronomy advice off the screen. We only treat the environment as
    // genuinely invalid after INVALID_THRESHOLD consecutive bad readings.
    // Recovery on a good reading is immediate, no debounce needed there.
    checkInvalidConditions() {
      const { N, P, K, temperature, soil_moisture, pH, conductivity } = this.cropInputs;

      const looksInvalid =
        (N == 0 && P == 0 && K == 0) ||
        temperature <= 0 ||
        soil_moisture < 0.05 ||
        pH < 4 || pH > 10 ||
        conductivity == 0;

      if (looksInvalid) {
        this.invalidStreak += 1;
      } else {
        this.invalidStreak = 0;
        this.isInvalid = false;
        return;
      }

      if (this.invalidStreak >= this.INVALID_THRESHOLD) {
        this.isInvalid = true;
        this.prediction = EMPTY_PREDICTION();
        this.agronomyAdvice = EMPTY_ADVICE();
        this.lastAdviceCrop = null;
      }
    }
  },
  async mounted() {
    // Wait for the first real fetch cycle to finish before dropping
    // the loading state, instead of guessing with a fixed timeout.
    await this.fetchCropInputs();
    await this.fetchCropPrediction();
    this.isLoading = false;

    this.pollTimer = setInterval(async () => {
      // Skip this tick if the previous poll is still in flight — polling
      // every 1s means a slow network round trip can otherwise overlap
      // with the next tick and let an older response overwrite a newer one.
      if (this.isPolling) {
        return;
      }
      this.isPolling = true;
      try {
        await this.fetchCropInputs();
        await this.fetchCropPrediction();
      } finally {
        this.isPolling = false;
      }
    }, 1000);
  },
  beforeUnmount() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
  }
};
</script>