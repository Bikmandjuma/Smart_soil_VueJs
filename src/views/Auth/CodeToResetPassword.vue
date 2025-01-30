<template>

  <div class="container mt-6" style="margin-top: 50px;">
    <!-- Alert for general messages -->
    <div v-if="message" class="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <i class="fa fa-exclamation-circle"></i> {{ message }}
    </div>

    <!-- Alert for localStorage messages -->
    <div v-if="message_localSto" class="p-2 mb-4 text-sm text-blue-700 bg-red-100 rounded-lg" role="alert">
      <i class="fa fa-exclamation-circle"></i> {{ message_localSto }}
    </div>

    <!-- Form for verification code -->
    <form class="otc" @submit.prevent="verifyCode">
      <fieldset>
        <legend>Verify Code before reset</legend>
        <div class="inputs-container">
          <input v-model="code" type="text" maxlength="7" @input="onInput" autofocus>
        </div>
      </fieldset>
      <button type="submit" v-if="loading"><i class="fa fa-spinner fa-spin"></i>&nbsp;Verifying...</button>
      <button type="submit" v-else><i class="fa fa-check"></i>&nbsp;Verify</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';

export default {
  data() {
    return {
      code: '',
      message: '',
      message_localSto: '',
      loading: false,
    };
  },

  beforeMount() {
    const email = localStorage.getItem('pswd_resettor_mail');
    if (!email) {
      this.$router.push({ name: 'ForgotPassword' });
    }
  },

  methods: {
    async verifyCode() {
      this.loading = true;
      const code = this.code.replace(/-/g, ''); // Remove hyphen
      const email = localStorage.getItem('pswd_resettor_mail');

      if (!email) {
        this.message = 'Email not found in localStorage.';
        return;
      }

      try {
        // Send the code in the body instead of the URL query string
        const response = await axios.post(`${laravelApiUrl}/code_to_reset_pswd/${email}`, { code });

        if (response.data.message) {
          this.message = response.data.message;
          localStorage.setItem('code_valid_msg',response.data.message);
          localStorage.setItem('pswd_resettor_code',code);

          this.loading=false;
          this.$router.push({name:'ResetPassword'});

        } else if (response.data.error) {
          this.message = response.data.error;
        }

      } catch (error) {

        if (error.response && error.response.data) {
          // Check if 'errors' and 'code' exist in the response
          if (error.response.data.errors && error.response.data.errors.code) {
            this.message = error.response.data.errors.code[0] || error.response.data.message || 'An unexpected error occurred.';
            setTimeout( () =>{
              this.message='';
            },5000);
          } else {
            this.message = error.response.data.message || 'An unexpected error occurred.';
            setTimeout( () =>{
              this.message='';
            },5000);
          }
        } else {
          this.message = 'An error occurred while processing your request.';
        }
      } finally {
        this.loading = false;
      }
    },

    onInput() {
      let formattedCode = this.code.replace(/\D/g, '').slice(0, 6); // Only allow digits

      if (formattedCode.length > 3) {
        formattedCode = formattedCode.slice(0, 3) + '-' + formattedCode.slice(3); // Add hyphen
      }

      this.code = formattedCode;
    },
  },

  mounted() {
    this.message_localSto = localStorage.getItem('reset_pswd_success_msg') || '';

    // Clear localStorage message after 5 seconds
    if (this.message_localSto) {
      setTimeout(() => {
        this.message_localSto = '';
        localStorage.removeItem('reset_pswd_success_msg');
      }, 5000);
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 30px;
  box-sizing: border-box;
  text-align: center;
}

.otc {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="text"] {
  width: 150px;
  height: 40px;
  margin: 5px;
  font-size: 24px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  outline: none;
  transition: border 0.3s ease;
}

input[type="text"]:focus {
  border-color: #007BFF;
}

button {
  background-color: #007BFF;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}
</style>
