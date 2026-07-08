<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-white shadow-xl dark:bg-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="flex text-2xl font-bold text-blue-500 items-center item-center justify-center">
          <img
            aria-hidden="true"
            class="object-cover dark:hidden"
            src="../assets/Homepage_images/carousel5.jpg"
            width="40"
            height="40"
          />
          <!-- <div id="title_name"-->
            &nbsp;&nbsp;<router-link to="#" class="inline-block mt-1 text-xl font-bold tracking-wider bg-gradient-to-b from-green-900 to-gray-800 bg-clip-text text-transparent" style="font-family: sa;font-style: italic;">IoT and Machine Learning-Based Crop Recommendation System</router-link>

            <!-- &nbsp;&nbsp;<span class="text-red-400 mt-1">Soil</span>&nbsp;<span class="text-purple-900 mt-1">Smart</span> -->
          <!--/div> -->
        
        </a>
        <div class="hidden md:flex space-x-6">
          
          <a href="/" :class="{'active-link': $route.path === '/'}" class="text-gray-600 hover:text-blue-500"><i class="fa fa-list-alt mr-2"></i>About system</a>
          <a
            href="/login"
            :class="{'active-link': $route.path === '/login'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-lock-open mr-2"></i>Login
          </a>
         
        </div>
        <button
          @click="toggleMenu"
          class="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="bg-gray-50 md:hidden">
    
          <a href="/" :class="{'active-link': $route.path === '/'}" class="block text-gray-600 px-4 py-2 hover:text-blue-500"><i class="fa fa-list-alt mr-2"></i>About system</a>

          <a
            href="/login"
            :class="{'active-link': $route.path === '/login'}"
            class="block text-gray-600 px-4 py-2 hover:text-blue-500"
          >
            <i class="fa fa-lock-open mr-2"></i>Login
          </a>

      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      isMenuOpen: false,
      hide_footer_authPages:false,
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    chechFooterVisibility() {
      const authPages = ['/login', '/register', '/forgot_password'];
      this.hide_footer_authPages = authPages.includes(this.$route.path);
    }
  },

  created(){
    this.chechFooterVisibility();
  },
  watch:{
    '$route' : 'chechFooterVisibility',
  }
  
};
</script>

<style scoped>
#title_name {
  position: absolute;
  margin-left: 50px;
  margin-top: 15px;
  
}

a {
  text-decoration: none;
}

.active-link {
  font-weight: bold;
  color: blueviolet !important;
  border-top: 2px solid purple;
  border-bottom: 2px solid blueviolet;
}

/*******************************/
/********* Footer CSS **********/
/*******************************/
.footer {
    position: relative;
    margin-top: 45px;
    padding-top: 90px;
    background: #202C45;
}

.footer .footer-contact,
.footer .footer-link,
.footer .footer-newsletter {
    position: relative;
    margin-bottom: 45px;
    color: #ffffff;
}

.footer .footer-newsletter input[placeholder='email']{
  color: white;
}

.footer .footer-contact h2,
.footer .footer-link h2,
.footer .footer-newsletter h2 {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #E81C2E;
}

.footer .footer-link a {
    display: block;
    margin-bottom: 10px;
    color: #ffffff;
    transition: .3s;
}

.footer .footer-link a::before {
    position: relative;
    content: "\f105";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    margin-right: 10px;
}

.footer .footer-link a:hover {
    color: #E81C2E;
    letter-spacing: 1px;
}

.footer .footer-contact p i {
    width: 25px;
}

.footer .footer-social {
    position: relative;
    margin-top: 20px;
    display: flex;
}

.footer .footer-social a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #202C45;
    background: #ffffff;
    border-radius: 40px;
    margin-right: 5px;
    transition: .5s;
}

.footer .footer-social a:last-child {
    margin: 0;
}

.footer .footer-social a:hover {
    color: #ffffff;
    background: #E81C2E;
}

.footer .footer-newsletter form {
    position: relative;
    width: 100%;
}

.footer .footer-newsletter input {
    margin-bottom: 15px;
    height: 45px;
    background: transparent;
    border: 1px solid #ffffff;
    border-radius: 5px;
}

.footer .footer-newsletter label {
    margin-top: 5px;
    color: #777777;
    font-size: 14px;
    letter-spacing: 1px;
}

.footer .footer-newsletter .btn.btn-custom {
    width: 100%;
    color: #202C45;
    background: #ffffff;
    box-shadow: inset 0 0 0 0 #E81C2E;
}

.footer .footer-newsletter .btn:hover {
    color: #ffffff;
    background: #E81C2E;
    box-shadow: inset 200px 0 0 0 #E81C2E;
}

.footer .copyright {
    text-align: center;
    padding-top: 15px;
    padding-bottom: 45px;
}

.footer .copyright p {
    margin: 0;
    color: #ffffff;
}

.footer .copyright p a {
    color: #E81C2E;
    font-weight: 700;
    letter-spacing: 1px;
}

.footer .copyright p a:hover {
    color: #ffffff;
}

</style>
