<template>
  <div class="home soil-signal">

    <!-- ============ HERO ============ -->

    <!-- ============ OVERVIEW ============ -->
    <section id="overview" class="section">
      <div class="container overview">
        <div class="overview__media">
          <img src="../../assets/Homepage_images/carousel5.jpg" alt="Farmland in Kayonza District" class="overview__img">
        </div>
        <div class="overview__text">
          <h2 class="h2">About the system</h2>
          <p>
            Agriculture plays an important role in Rwanda's economic development and food
            security. Farmers still face unpredictable climate conditions, poor crop
            selection, limited access to agricultural information, and inefficient use of
            resources.
          </p>
          <p>
            This project pairs low-cost IoT sensors with machine learning to give farmers in
            Kayonza District a crop recommendation grounded in their own soil and
            environmental data not guesswork.
          </p>
        </div>
      </div>
    </section>

    <!-- ============ KEY FEATURES ============ -->
    <section class="section section--tinted">
      <div class="container">
        <h2 class="h2 h2--center">Key features</h2>
        <div class="grid grid--4">

          <article class="card">
            <span class="card__tag">SOIL · 01</span>
            <h3>IoT-based data collection</h3>
            <p>Sensors capture real-time soil moisture, temperature, humidity, and pH directly from the field.</p>
          </article>

          <article class="card">
            <span class="card__tag">ML · 02</span>
            <h3>Machine learning prediction</h3>
            <p>Trained models read the agricultural data and recommend crops suited to the specific conditions found.</p>
          </article>

          <article class="card">
            <span class="card__tag">DATA · 03</span>
            <h3>Agricultural data management</h3>
            <p>Every reading is stored for ongoing analysis, monitoring, and future prediction.</p>
          </article>

          <article class="card">
            <span class="card__tag">UI · 04</span>
            <h3>Farmer decision support</h3>
            <p>Recommendations reach the farmer through a simple, interactive interface no technical background needed.</p>
          </article>

        </div>
      </div>
    </section>

    <!-- ============ HOW IT WORKS ============ -->
    <section class="section">
      <div class="container">
        <h2 class="h2 h2--center">How it works</h2>
        <ol class="steps">
          <li class="steps__item">
            <span class="steps__num">01</span>
            <div>
              <h3>Data collection</h3>
              <p>IoT sensors installed on the farm collect soil and environmental readings continuously.</p>
            </div>
          </li>
          <li class="steps__item">
            <span class="steps__num">02</span>
            <div>
              <h3>Data processing</h3>
              <p>Readings are transmitted and prepared for machine learning analysis.</p>
            </div>
          </li>
          <li class="steps__item">
            <span class="steps__num">03</span>
            <div>
              <h3>Machine learning analysis</h3>
              <p>Algorithms compare historical and real-time data to identify which crops suit current conditions.</p>
            </div>
          </li>
          <li class="steps__item">
            <span class="steps__num">04</span>
            <div>
              <h3>Crop recommendation</h3>
              <p>The farmer receives a clear recommendation through the web-based interface.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============ WHY CHOOSE ============ -->
    <section class="section section--dark">
      <div class="container">
        <h2 class="h2 h2--center h2--onDark">Why choose this system?</h2>
        <div class="grid grid--5 whygrid">
          <div class="why"><h4>Improved crop selection</h4><p>Backed by data, not tradition alone.</p></div>
          <div class="why"><h4>Increased productivity</h4><p>Better yields from better-matched crops.</p></div>
          <div class="why"><h4>Climate adaptation</h4><p>Responds to shifting weather patterns.</p></div>
          <div class="why"><h4>Resource optimization</h4><p>Less wasted water, fertilizer, and effort.</p></div>
          <div class="why"><h4>Agricultural modernization</h4><p>Supports Rwanda's tech-driven farming vision.</p></div>
        </div>
      </div>
    </section>

    <!-- ============ TARGET USERS ============ -->
    <section class="section">
      <div class="container">
        <h2 class="h2 h2--center">Who it's built for</h2>
        <ul class="taglist">
          <li>Smallholder farmers in Kayonza District</li>
          <li>Large-scale agricultural farmers</li>
          <li>Agricultural extension officers</li>
          <li>Government institutions, incl. MINAGRI Rwanda</li>
          <li>Agricultural researchers &amp; organizations</li>
        </ul>
      </div>
    </section>

    <!-- ============ TECHNICAL ============ -->
    <section id="technical" class="section section--tinted">
      <div class="container">
        <h2 class="h2 h2--center">Technical aspects</h2>
        <div class="grid grid--4">

          <div class="techcol">
            <span class="techcol__label">SENSORS</span>
            <ul>
              <li>Soil moisture sensors</li>
              <li>Temperature sensors</li>
              <li>Humidity sensors</li>
              <li>Soil pH sensors</li>
            </ul>
          </div>

          <div class="techcol">
            <span class="techcol__label">ML MODELS</span>
            <ul>
              <li>Decision Tree</li>
              <li>Random Forest</li>
              <li>Support Vector Machine</li>
              <li>Logistic Regression</li>
            </ul>
          </div>

          <div class="techcol">
            <span class="techcol__label">DATA STACK</span>
            <ul>
              <li>Python</li>
              <li>Pandas &amp; NumPy</li>
              <li>Scikit-learn</li>
              <li>Agricultural database</li>
            </ul>
          </div>

          <div class="techcol">
            <span class="techcol__label">INTERFACE</span>
            <ul>
              <li>Vue.js dashboard</li>
              <li>Flask / Laravel backend</li>
              <li>Mobile companion app</li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- ============ EXPECTED IMPACT ============ -->
    <section class="section">
      <div class="container impact">
        <h2 class="h2 h2--center">Expected impact</h2>
        <div class="grid grid--2">
          <p class="impact__line">Improved agricultural productivity in Kayonza District.</p>
          <p class="impact__line">Reduced farming losses from poor crop selection.</p>
          <p class="impact__line">Better utilization of agricultural resources.</p>
          <p class="impact__line">Improved farmer decision-making through technology.</p>
          <p class="impact__line impact__line--wide">Promotion of sustainable agriculture practices across Rwanda.</p>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap');

/* ---------- Tokens : "Soil & Signal" ---------- */
.soil-signal{
  --soil-950:#0F1B16;
  --soil-900:#14231C;
  --soil-800:#1D3128;
  --soil-700:#2A4438;
  --chlorophyll:#6FCF97;
  --harvest:#E3A857;
  --sensor-blue:#4FB0C6;
  --paper:#EFEAE0;
  --paper-dim:#9CA99E;

  --font-display:'Fraunces', serif;
  --font-mono:'IBM Plex Mono', monospace;
  --font-body:'Inter', sans-serif;

  font-family:var(--font-body);
  color:var(--soil-950);
  background:var(--paper);
}

.container{ max-width:1180px; margin:0 auto; padding:0 24px; }

/* ---------- Type scale ---------- */
.h2{
  font-family:var(--font-display);
  font-weight:700;
  font-size:clamp(1.6rem, 2.6vw, 2.2rem);
  color:var(--soil-950);
  margin:0 0 32px;
  letter-spacing:-0.01em;
}
.h2--center{ text-align:center; }
.h2--onDark{ color:var(--paper); }

/* ---------- Hero ---------- */
.hero{
  position:relative;
  background:var(--soil-900);
  color:var(--paper);
  overflow:hidden;
  padding:88px 0 96px;
}
.hero__field{
  position:absolute; inset:0;
  background:
    radial-gradient(60% 55% at 82% 15%, rgba(111,207,151,0.16), transparent 70%),
    repeating-linear-gradient(115deg, rgba(239,234,224,0.035) 0 2px, transparent 2px 34px);
  pointer-events:none;
}
.hero__grid{
  position:relative;
  display:grid;
  grid-template-columns:1.15fr 0.85fr;
  gap:56px;
  align-items:center;
}

.eyebrow{
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--font-mono);
  font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase;
  color:var(--chlorophyll);
  margin-bottom:22px;
}
.eyebrow__dot{
  width:6px; height:6px; border-radius:50%;
  background:var(--chlorophyll);
  box-shadow:0 0 0 4px rgba(111,207,151,0.18);
}

.hero__title{
  font-family:var(--font-display);
  font-weight:600;
  font-size:clamp(2.4rem, 5vw, 3.6rem);
  line-height:1.05;
  margin:0 0 22px;
}
.hero__title--accent{ color:var(--chlorophyll); font-style:italic; font-weight:700; }

.hero__lede{
  max-width:46ch;
  font-size:1.05rem;
  line-height:1.65;
  color:rgba(239,234,224,0.82);
  margin:0 0 34px;
}

.hero__actions{ display:flex; gap:14px; flex-wrap:wrap; }
.btn{
  font-family:var(--font-body);
  font-weight:600;
  font-size:0.92rem;
  padding:13px 24px;
  border-radius:8px;
  text-decoration:none;
  display:inline-block;
  transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.btn--primary{
  background:var(--chlorophyll);
  color:var(--soil-950);
}
.btn--primary:hover{ transform:translateY(-1px); box-shadow:0 10px 24px rgba(111,207,151,0.25); }
.btn--ghost{
  color:var(--paper);
  border:1px solid rgba(239,234,224,0.3);
}
.btn--ghost:hover{ border-color:var(--paper); background:rgba(239,234,224,0.06); }

/* ---------- Signature panel ---------- */
.panel{
  position:relative;
  background:var(--soil-800);
  border:1px solid rgba(239,234,224,0.08);
  border-radius:14px;
  padding:22px 24px 20px;
  box-shadow:0 30px 60px -20px rgba(0,0,0,0.55);
}
.panel__head{
  display:flex; justify-content:space-between; align-items:center;
  font-family:var(--font-mono);
  font-size:0.68rem; letter-spacing:0.08em;
  color:var(--paper-dim);
  margin-bottom:18px;
}
.panel__status{ display:flex; align-items:center; gap:7px; color:var(--chlorophyll); }
.panel__pulse{
  width:6px; height:6px; border-radius:50%;
  background:var(--chlorophyll);
  animation:pulse 1.8s ease-in-out infinite;
}
@keyframes pulse{
  0%,100%{ box-shadow:0 0 0 0 rgba(111,207,151,0.45); }
  50%{ box-shadow:0 0 0 6px rgba(111,207,151,0); }
}

.gauge{ margin-bottom:16px; }
.gauge__row{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; }
.gauge__label{ font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.08em; color:var(--paper-dim); }
.gauge__value{ font-family:var(--font-mono); font-size:1.05rem; font-weight:600; color:var(--paper); }
.gauge__value small{ font-size:0.65em; color:var(--paper-dim); }
.gauge__track{
  height:6px; border-radius:3px;
  background:rgba(239,234,224,0.09);
  overflow:hidden;
}
.gauge__fill{
  height:100%; width:var(--val);
  border-radius:3px;
  background:linear-gradient(90deg, hsl(var(--hue) 55% 45%), hsl(var(--hue) 65% 62%));
  transition:width .6s ease;
}
.gauge__caption{ font-size:0.72rem; color:var(--paper-dim); }

.panel__foot{
  display:flex; align-items:center; gap:8px; flex-wrap:wrap;
  padding-top:14px; margin-top:4px;
  border-top:1px dashed rgba(239,234,224,0.14);
  font-size:0.78rem; color:var(--paper-dim);
}
.panel__foot strong{ color:var(--harvest); font-family:var(--font-mono); }
.panel__crop{ margin-left:auto; color:var(--chlorophyll); font-family:var(--font-mono); font-size:0.72rem; }
.panel__id{ opacity:0.7; }

/* ---------- Sections ---------- */
.section{ padding:80px 0; }
.section--tinted{ background:#E8E2D2; }
.section--dark{ background:var(--soil-950); color:var(--paper); }

/* ---------- Overview ---------- */
.overview{
  display:grid; grid-template-columns:0.9fr 1.1fr; gap:56px; align-items:center;
}
.overview__img{ width:100%; border-radius:14px; display:block; box-shadow:0 24px 48px -24px rgba(15,27,22,0.4); }
.overview__text p{ line-height:1.7; color:var(--soil-700); margin-bottom:16px; font-size:1.02rem; }

/* ---------- Grids / cards ---------- */
.grid{ display:grid; gap:22px; }
.grid--4{ grid-template-columns:repeat(4, 1fr); }
.grid--2{ grid-template-columns:repeat(2, 1fr); }
.grid--5.whygrid{ grid-template-columns:repeat(5, 1fr); }

.card{
  background:var(--paper);
  border:1px solid rgba(15,27,22,0.08);
  border-radius:12px;
  padding:24px 22px;
}
.card__tag{
  display:inline-block;
  font-family:var(--font-mono);
  font-size:0.68rem; letter-spacing:0.08em;
  color:var(--sensor-blue);
  margin-bottom:12px;
}
.card h3{ font-family:var(--font-display); font-size:1.08rem; margin:0 0 8px; }
.card p{ font-size:0.92rem; line-height:1.55; color:var(--soil-700); margin:0; }

/* ---------- Steps ---------- */
.steps{ list-style:none; margin:0; padding:0; display:grid; gap:26px; }
.steps__item{ display:flex; gap:22px; align-items:flex-start; }
.steps__num{
  font-family:var(--font-mono); font-weight:600;
  font-size:0.85rem; color:var(--chlorophyll);
  background:var(--soil-950);
  min-width:44px; height:44px;
  border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  flex-shrink:0;
}
.steps__item h3{ font-family:var(--font-display); margin:0 0 4px; font-size:1.05rem; }
.steps__item p{ margin:0; color:var(--soil-700); font-size:0.94rem; line-height:1.55; }

/* ---------- Why grid ---------- */
.why h4{ font-family:var(--font-display); font-size:1rem; margin:0 0 8px; color:var(--chlorophyll); }
.why p{ font-size:0.86rem; color:rgba(239,234,224,0.75); line-height:1.5; margin:0; }

/* ---------- Tag list ---------- */
.taglist{
  list-style:none; margin:0; padding:0;
  display:flex; flex-wrap:wrap; gap:12px; justify-content:center;
}
.taglist li{
  font-size:0.88rem;
  padding:10px 18px;
  border-radius:999px;
  border:1px solid rgba(15,27,22,0.15);
  color:var(--soil-800);
}

/* ---------- Technical columns ---------- */
.techcol__label{
  display:block;
  font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.1em;
  color:var(--sensor-blue); margin-bottom:12px;
}
.techcol ul{ list-style:none; margin:0; padding:0; }
.techcol li{
  font-size:0.92rem; padding:8px 0;
  border-bottom:1px solid rgba(15,27,22,0.08);
  color:var(--soil-800);
}
.techcol li:last-child{ border-bottom:none; }

/* ---------- Impact ---------- */
.impact__line{
  font-family:var(--font-display);
  font-size:1.1rem;
  padding:18px 0;
  border-bottom:1px solid rgba(15,27,22,0.1);
  margin:0;
}
.impact__line--wide{ grid-column:1 / -1; color:var(--chlorophyll); font-weight:600; }

/* ---------- Responsive ---------- */
@media (max-width: 900px){
  .hero__grid{ grid-template-columns:1fr; }
  .overview{ grid-template-columns:1fr; }
  .grid--4{ grid-template-columns:repeat(2, 1fr); }
  .grid--5.whygrid{ grid-template-columns:repeat(2, 1fr); }
  .grid--2{ grid-template-columns:1fr; }
}

/* ---------- Accessibility ---------- */
a:focus-visible, .btn:focus-visible{
  outline:2px solid var(--chlorophyll);
  outline-offset:2px;
}
@media (prefers-reduced-motion: reduce){
  .panel__pulse{ animation:none; }
  .btn{ transition:none; }
}
</style>