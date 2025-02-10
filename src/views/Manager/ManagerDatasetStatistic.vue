<template>
    <div class="flex flex-wrap xl:flex-nowrap p-6">
      <!-- Table -->
      <div class="overflow-x-auto bg-white shadow-lg rounded-lg p-4 w-full xl:w-4/4">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Soil Data Statistics</h2>
        <table class=" border border-gray-300">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-4 py-2 border">Parameter</th>
              <th class="px-4 py-2 border">Count</th>
              <th class="px-4 py-2 border">Mean</th>
              <th class="px-4 py-2 border">Std</th>
              <th class="px-4 py-2 border">Min</th>
              <th class="px-4 py-2 border">25%</th>
              <th class="px-4 py-2 border">50% (Median)</th>
              <th class="px-4 py-2 border">75%</th>
              <th class="px-4 py-2 border">Max</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="(stats, key) in statistics" :key="key" class="border hover:bg-gray-100">
              <td class="px-4 py-2 border font-semibold">{{ key }}</td>
              <td class="px-4 py-2 border">{{ stats.count }}</td>
              <td class="px-4 py-2 border">{{ stats.mean.toFixed(2) }}</td>
              <td class="px-4 py-2 border">{{ stats.std.toFixed(2) }}</td>
              <td class="px-4 py-2 border">{{ stats.min }}</td>
              <td class="px-4 py-2 border">{{ stats["25%"] }}</td>
              <td class="px-4 py-2 border">{{ stats["50%"] }}</td>
              <td class="px-4 py-2 border">{{ stats["75%"] }}</td>
              <td class="px-4 py-2 border">{{ stats.max }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Card with Description -->
      <div class="bg-white shadow-md rounded-lg p-4 mt-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Statistical Terms Explained</h3>
        <ul class="text-gray-600">
          <li><strong>Count:</strong> Total number of observations recorded.</li>
          <li><strong>Mean:</strong> The average value of the parameter.</li>
          <li><strong>Std (Standard Deviation):</strong> Measures the spread of values (higher means more variation).</li>
          <li><strong>Min (Minimum):</strong> The lowest recorded value.</li>
          <li><strong>25% (First Quartile - Q1):</strong> 25% of the data falls below this value.</li>
          <li><strong>50% (Median - Q2):</strong> The middle value (50% of data is below, 50% is above).</li>
          <li><strong>75% (Third Quartile - Q3):</strong> 75% of the data falls below this value.</li>
          <li><strong>Max (Maximum):</strong> The highest recorded value.</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        statistics: {},
      };
    },
    mounted() {
      this.fetchStatistics();
    },
    methods: {
      async fetchStatistics() {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/statistics");
          this.statistics = await response.json();
        } catch (error) {
          console.error("Error fetching statistics:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1000px;
  }
  </style>
  