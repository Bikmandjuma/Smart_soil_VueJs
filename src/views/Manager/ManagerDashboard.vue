<template>
    <!-- Content -->
    <div class="mt-2">
      <!-- State cards -->
      <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
        <!-- Value card -->
      
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div class="text-center">
            <p class="text-md font-medium leading-none tracking-wider text-gray-500 dark:text-primary-light">
              N,P,K,pH
            </p>
            <span class="text-xl font-semibold">0,0,0,0</span>
          </div>
          <div>
            <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Users card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xl font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Temperature
            </h6>
            <span class="text-md font-semibold">0</span>
          </div>
          <div>
            <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Orders card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-md font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Soil_moisture
            </h6>
            <span class="text-xl font-semibold">0</span>
          </div>
          <div>
            <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Tickets card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-md font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Conductivity
            </h6>
            <!-- <span class="text-xl font-semibold" v-if="totalJobPositions.length > 0">{{ totalJobPositions }}</span> -->
            <span class="text-xl font-semibold">0</span>
          </div>
          <div>
            <span class="fa fa-list-alt w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>
      </div>

      <div>


      <div class="flex flex-wrap mt-3">
        <!-- Left Section (User Name and Image) -->
          <div class="w-full xl:w-1/4 mb-4">
            <!-- hey -->
          </div>

          <div class="w-full xl:w-1/2 mb-4">
              <div class="card border rounded-lg shadow-md">
                <div class="card-body pt-3 text-center">
                  <h3>recommended crops will be displayed here !</h3>
                </div>
              </div>
          </div>

        </div>

      </div>
      
      
    </div>

</template>

<script>
  export default {
    name: 'ManagerDashboard',
    data() {
      return {
      
      };
    },
    beforeMount() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.$router.push({ name: 'Login' });
      }
    },
  };
</script>
