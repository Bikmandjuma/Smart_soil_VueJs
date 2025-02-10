<!-- src/components/DatasetTable.vue -->
<template>
  <div class="container mx-auto my-8">
    <!-- Search Input -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="p-2 border rounded w-full"
      />
    </div>

    <!-- Data Table -->
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border">N</th>
          <th class="px-4 py-2 border">P</th>
          <th class="px-4 py-2 border">K</th>
          <th class="px-4 py-2 border">Temperature</th>
          <th class="px-4 py-2 border">pH</th>
          <th class="px-4 py-2 border">Soil Moisture</th>
          <th class="px-4 py-2 border">Conductivity</th>
          <th class="px-4 py-2 border">Label</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in paginatedData" :key="index">
          <td class="px-4 py-2 border">{{ row.N }}</td>
          <td class="px-4 py-2 border">{{ row.P }}</td>
          <td class="px-4 py-2 border">{{ row.K }}</td>
          <td class="px-4 py-2 border">{{ row.temperature }}</td>
          <td class="px-4 py-2 border">{{ row.ph }}</td>
          <td class="px-4 py-2 border">{{ row.soil_moisture }}</td>
          <td class="px-4 py-2 border">{{ row.conductivity }}</td>
          <td class="px-4 py-2 border">{{ row.label }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-4">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Previous
      </button>

      <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Search query
      searchQuery: '',
      // The dataset
      dataset: [],
      // Pagination control
      currentPage: 1,
      rowsPerPage: 10,
    };
  },
  computed: {
    // Filtered data based on the search query
    filteredData() {
      const query = this.searchQuery.toLowerCase();
      return this.dataset.filter((row) => {
        return (
          row.N.toString().includes(query) ||
          row.P.toString().includes(query) ||
          row.K.toString().includes(query) ||
          row.ph.toString().includes(query) ||
          row.label.toLowerCase().includes(query) ||
          row.conductivity.toString().includes(query) ||
          row.temperature.toString().includes(query) ||
          row.soil_moisture.toString().includes(query)
        );
      });
    },

    // Paginated data based on current page and rows per page
    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.filteredData.slice(start, end);
    },

    // Total number of pages
    totalPages() {
      return Math.ceil(this.filteredData.length / this.rowsPerPage);
    },
  },
  methods: {
    // Change the current page
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
  },
  mounted() {
    // Fetch the dataset when the component is mounted
    fetch('http://localhost:5000/api/get_dataset')
      .then((response) => response.json())
      .then((data) => {
        this.dataset = data; // Store the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
