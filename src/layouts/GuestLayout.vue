<template>
    <div>

      <nav class="bg-white shadow-xl p-4">

        <div class="flex text-center items-center justify-center">
                <img
                  aria-hidden="true"
                  class="object-cover dark:hidden"
                  src="../assets/Homepage_images/carousel5.jpg"
                  width="40"
                  height="40"
                />
              
                &nbsp;&nbsp;<router-link to="#" class="inline-block mt-1 text-2xl font-bold tracking-wider bg-gradient-to-b from-green-900 to-gray-800 bg-clip-text text-transparent" style="font-family: sa;font-style: italic;">Soil_Smart</router-link>
        </div>
      </nav>

      <main>
        <slot></slot>
      </main>
  
    </div>
</template>
  
  <script>
  export default {
    name: 'GuestLayout'
  }
  </script>
  
  <style scoped>
    a{
      text-decoration: none;
    }
  </style>
  