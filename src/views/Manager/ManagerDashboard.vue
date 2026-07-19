<template>
  <div class="mt-2">
    <div class="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 xl:grid-cols-5">
      <div class="stat-card bg-gradient-to-br from-blue-500 to-blue-700">
        <p class="stat-label"><span class="fa fa-flask mr-1"></span>N, P, K, pH</p>
        <span class="stat-value">{{ cropInputs.N }}, {{ cropInputs.P }}, {{ cropInputs.K }}, {{ cropInputs.pH }}</span>
      </div>

      <div class="stat-card bg-gradient-to-br from-orange-400 to-red-500">
        <p class="stat-label"><span class="fa fa-thermometer-half mr-1"></span>Soil Temperature</p>
        <span class="stat-value">{{ cropInputs.temperature }}°C</span>
      </div>

      <div class="stat-card bg-gradient-to-br from-cyan-500 to-teal-600">
        <p class="stat-label"><span class="fa fa-tint mr-1"></span>Soil Moisture</p>
        <span class="stat-value">{{ cropInputs.soil_moisture }}</span>
      </div>

      <div class="stat-card bg-gradient-to-br from-purple-500 to-indigo-600">
        <p class="stat-label"><span class="fa fa-bolt mr-1"></span>Conductivity</p>
        <span class="stat-value">{{ cropInputs.conductivity }}</span>
      </div>

      <!-- Ambient (DHT11) card -->
      <div class="stat-card" :class="weatherGradientClass">
        <p class="stat-label">
          <span :class="weatherIconClass" class="mr-1"></span>Weather
          <span v-if="isAmbientStale" class="stale-dot" title="Reading may be stale"></span>
        </p>

        <template v-if="ambientStatus === 'ok'">
          <div class="weather-readings">
            <span class="reading-item"><strong>T:</strong>&nbsp;{{ cropInputs.weather_temperature }}°C</span>
            <span class="reading-item"><strong>H:</strong>&nbsp;{{ cropInputs.weather_humidity }}%</span>
          </div>
          <span class="stat-sub">{{ weatherCondition }}</span>
        </template>
        <template v-else-if="ambientStatus === 'missing'">
          <span class="stat-value text-lg">No data yet</span>
          <span class="stat-sub">Waiting for DHT11 reading</span>
        </template>
        <template v-else>
          <span class="stat-value text-lg">Out of range</span>
          <span class="stat-sub">Check sensor wiring</span>
        </template>
      </div>
    </div>

    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-4">
        <div class="modern-card">
          <div class="card-body pt-3 text-center" style="overflow-x: scroll;">
            <div v-if="isLoading" class="loading-pulse">
              <span class="fa fa-spinner fa-spin mr-2"></span>Analyzing conditions...
            </div>

            <template v-if="!isLoading">
              <div v-if="!isInvalid" class="mb-3">
                <p class="text-sm uppercase tracking-wider text-gray-400 mb-1">Recommended Crop</p>
                <h2 class="text-3xl font-bold text-blue-600">{{ prediction.most_probable_crop }}</h2>
                <p class="text-xs text-gray-500 mt-1">
                  <span :class="weatherIconClass" class="mr-1"></span>
                  <template v-if="ambientStatus === 'ok'">Adjusted for ambient conditions: {{ weatherCondition }}</template>
                  <template v-else>Ambient data unavailable — ranked on soil readings only</template>
                </p>
              </div>

              <table v-if="!isInvalid" class="modern-table">
                <thead>
                  <tr>
                    <th>N<sup>o</sup></th>
                    <th>Crop</th>
                    <th>Base score</th>
                    <th>Weather fit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in sortedProbabilities"
                    :key="row.crop"
                    :class="row.crop === prediction.most_probable_crop ? 'row-best' : ''"
                  >
                    <td>{{ count_crop + index }}</td>
                    <td>
                      {{ row.crop }}
                      <span v-if="row.crop === prediction.most_probable_crop" class="best-badge">Best match</span>
                    </td>
                    <td>{{ (row.prob * 100).toFixed(0) }}%</td>
                    <td>
                      <div class="weather-fit-bar">
                        <div class="weather-fit-fill" :style="{ width: (row.weatherFit * 100) + '%' }"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-if="isInvalid" class="invalid-banner">
                <span class="fa fa-triangle-exclamation mr-2"></span>
                {{ invalidMessage }}
              </div>
            </template>
          </div>
        </div>
      </div>

      <div v-if="!isLoading && !isInvalid" class="w-full mb-4">
        <div class="modern-card">
          <div class="card-body pt-3 text-left">
            <h4 class="font-bold text-gray-700 mb-1">
              Agronomy advice for <span class="text-blue-600">{{ prediction.most_probable_crop }}</span>
            </h4>
            <p class="text-xs text-gray-400 mb-3">
              <span :class="weatherIconClass" class="mr-1"></span>
              <template v-if="ambientStatus === 'ok'">Tailored for on-site ambient conditions: {{ weatherCondition }}</template>
              <template v-else>General guidance — no ambient reading available yet</template>
            </p>

            <p v-if="isLoadingAdvice" class="text-blue-600 font-medium">
              <span class="fa fa-spinner fa-spin mr-2"></span>Fetching AI recommendations...
            </p>
            <p v-else-if="adviceError" class="text-red-600">{{ adviceError }}</p>

            <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div class="advice-card">
                <h6 class="advice-title"><span class="fa fa-seedling mr-1"></span>Fertilization</h6>
                <p class="advice-text">{{ agronomyAdvice.fertilization || "N/A" }}</p>
              </div>
              <div class="advice-card">
                <h6 class="advice-title"><span class="fa fa-calendar-days mr-1"></span>Planting season</h6>
                <p class="advice-text">{{ agronomyAdvice.planting_season || "N/A" }}</p>
              </div>
              <div class="advice-card">
                <h6 class="advice-title"><span class="fa fa-droplet mr-1"></span>Irrigation schedule</h6>
                <p class="advice-text">{{ agronomyAdvice.irrigation || "N/A" }}</p>
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

const EMPTY_PREDICTION = () => ({
  most_probable_crop: "N/A",
  predicted_probabilities: { 0: {} },
  weather_adjusted_probabilities: { 0: {} }
});

const EMPTY_ADVICE = () => ({
  fertilization: "",
  planting_season: "",
  irrigation: ""
});

const DHT11_TEMP_RANGE = [0, 50];
const DHT11_HUMIDITY_RANGE = [20, 90];
const STALE_READING_MINUTES = 5;

export default {
  name: "ManagerDashboard",
  data() {
    return {
      count_crop: 1,
      isLoading: true,
      isInvalid: false,
      invalidMessage: "No crop is recommended for the given conditions. The environment is unsuitable for farming.",
      pollTimer: null,
      cropInputs: {
        N: 0, P: 0, K: 0, pH: 0,
        temperature: 0, soil_moisture: 0,
        conductivity: 0,
        weather_temperature: null, weather_humidity: null,
        created_at: null
      },
      weatherCondition: "unknown",
      prediction: EMPTY_PREDICTION(),
      agronomyAdvice: EMPTY_ADVICE(),
      isLoadingAdvice: false,
      adviceError: null,
      lastAdviceCrop: null,
      lastAdviceWeather: null,
      invalidStreak: 0,
      INVALID_THRESHOLD: 3,
      isPolling: false
    };
  },
  computed: {
    sortedProbabilities() {
      const raw = (this.prediction.predicted_probabilities && this.prediction.predicted_probabilities[0]) || {};
      const adjusted = (this.prediction.weather_adjusted_probabilities && this.prediction.weather_adjusted_probabilities[0]) || {};
      return Object.entries(raw)
        .map(([crop, prob]) => ({ crop, prob, weatherFit: adjusted[crop] !== undefined ? adjusted[crop] / (prob || 1) : 1 }))
        .filter((row) => row.prob >= 0.05)
        .sort((a, b) => (adjusted[b.crop] ?? b.prob) - (adjusted[a.crop] ?? a.prob));
    },
    ambientStatus() {
      const t = this.cropInputs.weather_temperature;
      const h = this.cropInputs.weather_humidity;
      if (t === null || t === undefined || h === null || h === undefined) {
        return "missing";
      }
      const [tLo, tHi] = DHT11_TEMP_RANGE;
      const [hLo, hHi] = DHT11_HUMIDITY_RANGE;
      if (t < tLo || t > tHi || h < hLo || h > hHi) {
        return "out_of_range";
      }
      return "ok";
    },
    isAmbientStale() {
      if (this.ambientStatus !== "ok" || !this.cropInputs.created_at) return false;
      const created = new Date(this.cropInputs.created_at.replace(" ", "T"));
      if (isNaN(created.getTime())) return false;
      const diffMinutes = (Date.now() - created.getTime()) / 60000;
      return diffMinutes > STALE_READING_MINUTES;
    },
    weatherTempDesc() {
      const t = this.cropInputs.weather_temperature;
      if (t >= 30) return "hot";
      if (t >= 20) return "warm";
      if (t >= 10) return "mild";
      return "cold";
    },
    weatherHumidityDesc() {
      const h = this.cropInputs.weather_humidity;
      if (h >= 70) return "humid";
      if (h >= 40) return "moderate";
      return "dry";
    },
    weatherIconClass() {
      if (this.ambientStatus === "missing") return "fa fa-circle-question text-slate-500";
      if (this.ambientStatus === "out_of_range") return "fa fa-triangle-exclamation text-white";
      const t = this.weatherTempDesc;
      const h = this.weatherHumidityDesc;
      if (t === "cold") return "fa fa-snowflake text-blue-100";
      if (t === "hot" && h === "dry") return "fa fa-sun text-yellow-200";
      if (t === "hot" && h !== "dry") return "fa fa-cloud-sun-rain text-yellow-100";
      if (h === "humid") return "fa fa-cloud-rain text-white";
      return "fa fa-cloud-sun text-white";
    },
    // Softer, lighter gradients — no near-black tones for "missing" /
    // "out_of_range" states, which is what was reading as a black card.
    weatherGradientClass() {
      if (this.ambientStatus === "missing") return "bg-gradient-to-br from-slate-200 to-slate-400";
      if (this.ambientStatus === "out_of_range") return "bg-gradient-to-br from-rose-400 to-red-500";
      const t = this.weatherTempDesc;
      if (t === "cold") return "bg-gradient-to-br from-sky-400 to-blue-600";
      if (t === "hot") return "bg-gradient-to-br from-amber-400 to-orange-600";
      return "bg-gradient-to-br from-emerald-400 to-teal-600";
    }
  },
  methods: {
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

      const pickNullable = (...candidates) => {
        for (const value of candidates) {
          if (value !== undefined) {
            return value;
          }
        }
        return null;
      };

      return {
        N: pick(data.N, data.nitrogen, soil.nitrogen, this.cropInputs.N),
        P: pick(data.P, data.phosphorus, soil.phosphorus, this.cropInputs.P),
        K: pick(data.K, data.potassium, soil.potassium, this.cropInputs.K),
        pH: pick(data.pH, data.ph, soil.ph, this.cropInputs.pH),
        temperature: pick(data.temperature, soil.temperature, ambient.temperature, this.cropInputs.temperature),
        soil_moisture: pick(data.soil_moisture, data.moisture, soil.moisture, this.cropInputs.soil_moisture),
        conductivity: pick(data.conductivity, data.ec, soil.ec, this.cropInputs.conductivity),
        weather_temperature: pickNullable(data.weather_temperature, ambient.weather_temperature),
        weather_humidity: pickNullable(data.weather_humidity, ambient.weather_humidity),
        created_at: data.created_at ?? this.cropInputs.created_at
      };
    },

    isSameCropInputs(a, b) {
      return (
        a.N === b.N &&
        a.P === b.P &&
        a.K === b.K &&
        a.pH === b.pH &&
        a.temperature === b.temperature &&
        a.soil_moisture === b.soil_moisture &&
        a.conductivity === b.conductivity &&
        a.weather_temperature === b.weather_temperature &&
        a.weather_humidity === b.weather_humidity &&
        a.created_at === b.created_at
      );
    },

    async fetchCropInputs() {
      try {
        const response = await fetch(`${laravelApiUrl}/sensor-data/latest`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const normalized = this.normalizeCropInputs(data);

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

        if (data.message && !data.predicted_probabilities) {
          this.invalidMessage = data.message;
          this.isInvalid = true;
          this.prediction = EMPTY_PREDICTION();
          if (data.weather_condition !== undefined) this.weatherCondition = data.weather_condition || "unknown";
          return;
        }

        this.weatherCondition = data.weather_condition || "unknown";

        const hasValidShape =
          data &&
          data.predicted_probabilities &&
          typeof data.predicted_probabilities[0] === "object";

        const nextPrediction = hasValidShape
          ? {
              most_probable_crop: data.most_probable_crop ?? "N/A",
              predicted_probabilities: data.predicted_probabilities,
              weather_adjusted_probabilities: data.weather_adjusted_probabilities ?? { 0: {} }
            }
          : EMPTY_PREDICTION();

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

    async fetchAgronomyAdvice(crop) {
      if (crop === this.lastAdviceCrop && this.weatherCondition === this.lastAdviceWeather) {
        return;
      }

      this.isLoadingAdvice = true;
      this.adviceError = null;

      try {
        const params = new URLSearchParams({ crop });
        if (this.cropInputs.weather_temperature !== null) {
          params.set("weather_temperature", this.cropInputs.weather_temperature);
        }
        if (this.cropInputs.weather_humidity !== null) {
          params.set("weather_humidity", this.cropInputs.weather_humidity);
        }

        const response = await fetch(`${flaskApiUrl}/crop_agronomy_advice?${params.toString()}`);

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
        this.lastAdviceWeather = this.weatherCondition;
      } catch (error) {
        console.error("Error fetching agronomy advice:", error);
        this.adviceError = "Could not fetch agronomy advice right now.";
        this.agronomyAdvice = EMPTY_ADVICE();
      } finally {
        this.isLoadingAdvice = false;
      }
    },

    checkInvalidConditions() {
      const { N, P, K, temperature, soil_moisture, pH, conductivity } = this.cropInputs;

      const soilLooksInvalid =
        (N == 0 && P == 0 && K == 0) ||
        temperature <= 0 ||
        soil_moisture < 0.05 ||
        pH < 4 || pH > 10 ||
        conductivity == 0;

      const ambientLooksInvalid = this.ambientStatus === "out_of_range" || this.isAmbientStale;

      if (soilLooksInvalid || ambientLooksInvalid) {
        this.invalidStreak += 1;
        this.invalidMessage = ambientLooksInvalid
          ? "Ambient sensor (DHT11) reading is out of range or stale — check wiring/connectivity."
          : "No crop is recommended for the given conditions. The environment is unsuitable for farming.";
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
        this.lastAdviceWeather = null;
      }
    }
  },
  async mounted() {
    await this.fetchCropInputs();
    await this.fetchCropPrediction();
    this.isLoading = false;

    this.pollTimer = setInterval(async () => {
      if (this.isPolling) return;
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
    if (this.pollTimer) clearInterval(this.pollTimer);
  }
};
</script>

<style scoped>
.stat-card {
  @apply p-4 rounded-2xl shadow-lg text-white flex flex-col gap-1 transition-transform duration-200 relative;
}
.stat-card:hover { transform: translateY(-3px); }
.stat-label { @apply text-xs font-medium uppercase tracking-wider opacity-90 flex items-center; }
.stat-value { @apply text-xl font-bold; }
.stat-sub { @apply text-xs opacity-90 mt-1; }
.stale-dot {
  @apply inline-block w-2 h-2 rounded-full bg-yellow-300 ml-2 animate-pulse;
}
.weather-readings {
  @apply flex gap-4 mt-1;
}
.reading-item {
  @apply text-base font-semibold;
}

/* Always light card background — no dark: variant, so it can never
   render as a black card regardless of the app's global theme. */
.modern-card { @apply bg-white rounded-2xl shadow-md border border-gray-100; }
.card-body { @apply p-4; }

.loading-pulse { @apply text-blue-600 font-semibold animate-pulse; }

.modern-table { @apply w-full text-sm rounded-xl overflow-hidden; }
.modern-table thead { @apply bg-gray-700 text-white; }
.modern-table th { @apply py-3 px-4 text-center; }
.modern-table td { @apply py-3 px-4 text-center border-b border-gray-100; }
.row-best { @apply bg-blue-50 font-semibold text-blue-700 border-l-4 border-blue-600; }
.best-badge { @apply ml-2 text-xs uppercase tracking-wide bg-blue-600 text-white rounded-full px-2 py-0.5; }

.weather-fit-bar { @apply w-full h-2 bg-gray-100 rounded-full overflow-hidden; }
.weather-fit-fill { @apply h-full bg-gradient-to-r from-emerald-400 to-teal-500; }

.invalid-banner { @apply bg-red-50 text-red-700 font-semibold rounded-xl p-4; }

.advice-card { @apply p-4 bg-gray-50 rounded-xl transition-transform duration-200; }
.advice-card:hover { transform: translateY(-2px); }
.advice-title { @apply uppercase text-xs font-semibold text-gray-500 mb-2; }
.advice-text { @apply text-sm text-gray-700 whitespace-pre-line; }
</style>