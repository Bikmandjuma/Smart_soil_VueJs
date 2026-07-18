<template>
  <div class="login soil-signal" id="login_container">
    <div class="login__card">

      <!-- Brand panel (left) -->
      <div class="login__brand" aria-hidden="true">
        <div class="login__field"></div>
        <img
          src="../../assets/Homepage_images/forgot-password-office.jpeg"
          alt="Soil sensor in the field"
          class="login__brand-img"
        />
      </div>

      <!-- Form panel (right) -->
      <div class="login__form">
        <div class="login__form-inner">
          <span class="form__eyebrow">RECOVER ACCESS</span>
          <h1 class="form__title">Forgot password</h1>
          <p class="form__sub">Enter your email and we'll send you a recovery code.</p>

          <label class="field" for="email">
            <span class="field__label"><i class="fa fa-envelope"></i>&nbsp;Email</span>
            <input
              v-model="email"
              id="email"
              type="email"
              class="field__input"
              placeholder="Enter email"
            />
          </label>

          <p v-if="error" style="color:red;font-size:14px;">{{ error }}</p>
          <p v-if="success" style="color:green;">{{ success }}</p>

          <button
            type="submit"
            class="btn btn--primary btn--block"
            @click="recoverPassword"
            v-if="loading"
            disabled
          >
            <i class="fa fa-spinner fa-spin"></i>&nbsp;Recovering…
          </button>

          <button
            type="submit"
            class="btn btn--primary btn--block"
            @click="recoverPassword"
            v-else
          >
            <i class="fa fa-key"></i>&nbsp;Recover password
          </button>

          <div class="login__foot">
            <router-link class="link" to="/login">
              <i class="fa fa-arrow-left"></i>&nbsp;Back to login
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { laravelApiUrl } from "../../api";

export default {
  data() {
    return {
      email: "",
      error: null,
      success: null,
      loading:false,
    };
  },
  methods: {
    async recoverPassword() {
      this.error = null;
      this.success = null;
      this.loading = true;
      
      try {
          const response = await axios.post(`${laravelApiUrl}/forgot_password`, {
              email: this.email,
          });

          // Handle success response
          if (response.data.status === "success") {
              this.success = response.data.message;
              localStorage.setItem('pswd_resettor_mail', this.email);
              localStorage.setItem('reset_pswd_success_msg', response.data.message);
              setTimeout( ()=>{
                this.loading = false;
                this.$router.push({name: "ResetCodePassword"});
              });
          }
      } catch (err) {
          console.log(err);  // Log the error to check the response structure
          if (err.response && err.response.data && err.response.data.errors) {
              this.error = err.response.data.errors.email 
              ? err.response.data.errors.email[0]
              : "An error occurred. Please try again.";  // Fallback message if no email error exists
              setTimeout(() => {
              this.error = "";
              }, 5000);
          } else {
              this.error = err.response.data ? err.response.data.message : "Unable to connect to the server. Please try later.";
          }
      
      }finally{
        this.loading=false;
      }
      
    },
  },
  mounted(){
      // setTimeout(() =>{
      //     this.error = "";
      // },5000);
  
      
  },

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap');

.soil-signal{
  --soil-950:#0F1B16;
  --soil-900:#14231C;
  --soil-800:#1D3128;
  --soil-700:#2A4438;
  --chlorophyll:#6FCF97;
  --harvest:#E3A857;
  --sensor-blue:#4FB0C6;
  --clay-red:#D96C5A;
  --paper:#EFEAE0;
  --paper-dim:#9CA99E;

  --font-display:'Fraunces', serif;
  --font-mono:'IBM Plex Mono', monospace;
  --font-body:'Inter', sans-serif;
}

/* ---------- Layout ---------- */
#login_container{ margin-top: 0; }

.login{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:32px;
  background:var(--paper);
  font-family:var(--font-body);
}

.login__card{
  width:100%;
  max-width:920px;
  display:grid;
  grid-template-columns:0.95fr 1.05fr;
  border-radius:16px;
  overflow:hidden;
  box-shadow:0 40px 80px -30px rgba(15,27,22,0.35);
  background:#fff;
}

/* ---------- Brand side ---------- */
.login__brand{
  position:relative;
  background:var(--soil-900);
  overflow:hidden;
  min-height:280px;
}
.login__brand-img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
}
.login__field{
  position:absolute; inset:0; z-index:1;
  background:
    linear-gradient(200deg, rgba(15,27,22,0.15) 0%, rgba(15,27,22,0.6) 100%),
    radial-gradient(65% 55% at 85% 10%, rgba(111,207,151,0.18), transparent 70%);
  pointer-events:none;
}

/* ---------- Form side ---------- */
.login__form{
  display:flex;
  align-items:center;
  padding:48px 44px;
}
.login__form-inner{ width:100%; }

.form__eyebrow{
  display:block;
  font-family:var(--font-mono);
  font-size:0.68rem; letter-spacing:0.12em;
  color:var(--sensor-blue);
  margin-bottom:10px;
}
.form__title{
  font-family:var(--font-display);
  font-weight:700;
  font-size:1.6rem;
  color:var(--soil-950);
  margin:0 0 8px;
}
.form__sub{
  font-size:0.9rem;
  color:var(--soil-700);
  margin:0 0 26px;
}

.field{ display:block; font-size:0.8rem; margin-bottom:8px; }
.field__label{
  display:block;
  font-weight:600;
  color:var(--soil-800);
  margin-bottom:6px;
}
.field__input{
  width:100%;
  font-family:var(--font-body);
  font-size:0.92rem;
  padding:11px 14px;
  border-radius:8px;
  border:1px solid rgba(15,27,22,0.16);
  background:var(--paper);
  color:var(--soil-950);
  transition:border-color .15s ease, box-shadow .15s ease;
}
.field__input::placeholder{ color:var(--paper-dim); }
.field__input:focus{
  outline:none;
  border-color:var(--chlorophyll);
  box-shadow:0 0 0 3px rgba(111,207,151,0.18);
}

.alert{
  font-size:0.85rem;
  padding:10px 14px;
  border-radius:8px;
  margin:14px 0 0;
}
.alert--error{
  background:rgba(217,108,90,0.1);
  color:var(--clay-red);
  border:1px solid rgba(217,108,90,0.25);
}
.alert--success{
  background:rgba(111,207,151,0.12);
  color:#3E8A5F;
  border:1px solid rgba(111,207,151,0.3);
}

.btn{
  font-family:var(--font-body);
  font-weight:600;
  font-size:0.92rem;
  padding:12px 20px;
  border-radius:8px;
  border:none;
  cursor:pointer;
  transition:transform .15s ease, box-shadow .15s ease, opacity .15s ease;
}
.btn--block{ width:100%; margin-top:20px; }
.btn--primary{
  background:var(--chlorophyll);
  color:var(--soil-950);
}
.btn--primary:hover{ transform:translateY(-1px); box-shadow:0 10px 22px rgba(111,207,151,0.25); }
.btn--primary:disabled{ opacity:0.75; cursor:progress; transform:none; box-shadow:none; }

.login__foot{
  margin-top:26px;
  padding-top:20px;
  border-top:1px solid rgba(15,27,22,0.08);
  text-align:center;
}
.link{
  font-size:0.85rem;
  font-weight:600;
  color:var(--sensor-blue);
  text-decoration:none;
}
.link:hover{ text-decoration:underline; }

/* ---------- Responsive ---------- */
@media (max-width: 760px){
  .login__card{ grid-template-columns:1fr; }
  .login__brand{ min-height:180px; }
  .login__form{ padding:36px 28px; }
}

/* ---------- Accessibility ---------- */
.field__input:focus-visible,
.btn:focus-visible,
.link:focus-visible{
  outline:2px solid var(--chlorophyll);
  outline-offset:2px;
}
@media (prefers-reduced-motion: reduce){
  .btn{ transition:none; }
}
</style>