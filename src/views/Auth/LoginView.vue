<template>
  <div class="login soil-signal" id="login_container">
    <div class="login__card">

      <!-- Brand panel (left) -->
      <div class="login__brand" aria-hidden="true">
        <div class="login__field"></div>
        <img
          src="../../assets/Homepage_images/create-account-office.jpeg"
          alt="Soil sensor in the field"
          class="login__brand-img"
        />
      </div>

      <!-- Form panel (right) -->
      <div class="login__form">
        <div class="login__form-inner">
          <span class="form__eyebrow">ACCESS</span>
          <h2 class="form__title">Welcome back</h2>
          <p class="form__sub">Sign in to view your field data and recommendations.</p>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert" role="alert">
            <i class="fa fa-exclamation-circle"></i> {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin" class="fields">
            <div class="field">
              <label for="emailOrPhone">Email or phone</label>
              <input
                v-model="emailOrPhone"
                id="emailOrPhone"
                type="text"
                placeholder="Enter your email or phone"
                class="field__input"
              />
            </div>

            <div class="field">
              <label for="password">Password</label>
              <input
                v-model="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                class="field__input"
              />
            </div>

            <button v-if="loading" type="submit" class="btn btn--primary btn--block" disabled>
              <i class="fa fa-spinner fa-spin"></i>&nbsp;Logging in…
            </button>

            <button v-else type="submit" class="btn btn--primary btn--block">
              <i class="fa fa-lock-open"></i>&nbsp;Login
            </button>
          </form>

          <div class="login__foot">
            <router-link class="link" to="/forgot_password">
              <i class="fa fa-key"></i>&nbsp;Forgot your password?
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { laravelApiUrl } from '../../api';

export default {
  data() {
    return {
      emailOrPhone: "",
      password: "",
      errorMessage: null,
      loading: false,
    };
  },

  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = null;  // Clear previous error message
    
      try {
          if (!this.emailOrPhone || !this.password) {
            this.errorMessage = "Email/Phone and Password are required.";
            setTimeout(() => {
              this.errorMessage = null;
            }, 3000);
            this.loading = false;
            return;
          }

        
          const loginData = {
            username: this.emailOrPhone,
            password: this.password,
          };

          const response = await fetch(`${laravelApiUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          });

          const data = await response.json();
          console.log(data);

          if (response.ok) {
            localStorage.setItem("auth_token", data.authorisation.token);

            if (data.role === "admin") {
              console.log("Redirecting to AdminDashboard");
              // setTimeout(() => {
              //   this.loading = false;
                this.$router.push({ name: "AdminDashboard" });
              // }, 2000);
            } else if (data.role === "user") {
              console.log("Redirecting to ManagerDashboard");
              // setTimeout(() => {
              //   this.loading = false;
                this.$router.push({ name: "ManagerDashboard" });
              // }, 2000);
            } else {
              console.error("Unknown role:", data.role);
              this.errorMessage = "Unknown role. Contact support.";
              // setTimeout(() => {
              //   this.loading = false;
              //   this.errorMessage = null; // Clear error message after 3 seconds
              // }, 3000);
            }

          } else {
            console.error("Login failed:", data);
            this.errorMessage = data.message || "Login failed. Please try again.";
            // setTimeout(() => {
            //   this.loading = false;
            //   this.errorMessage = null; // Clear error message after 3 seconds
            // }, 3000);
          }

      } catch (error) {
          console.error("Login error:", error);
          this.errorMessage = "An unexpected error occurred. Please try again later.";
          // setTimeout(() => {
          //   this.loading = false;
          //   this.errorMessage = null; // Clear error message after 3 seconds
          // }, 3000);
      }
      finally{
        this.loading = false;
      }
    },
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

.alert{
  display:flex; align-items:center; gap:8px;
  background:rgba(217,108,90,0.1);
  color:var(--clay-red);
  border:1px solid rgba(217,108,90,0.25);
  font-size:0.85rem;
  padding:10px 14px;
  border-radius:8px;
  margin-bottom:20px;
}

.fields{ display:flex; flex-direction:column; gap:18px; }
.field label{
  display:block;
  font-size:0.8rem;
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
.btn--block{ width:100%; margin-top:6px; }
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
  .mini-panel__pulse{ animation:none; }
  .btn{ transition:none; }
}
</style>