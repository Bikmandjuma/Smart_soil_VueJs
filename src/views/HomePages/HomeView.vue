<template>
    <div class="home">
      
           <!-- Hero Section -->
          <section>
              <br>
              <div class="about">
                  <div class="container">
                  <br>
                      <div class="row align-items-center">
                          <div class="col-lg-12">
                              <div class="section-header text-center" style="margin-top: -20px;">
                                  <p id="ad_title" class="inline-block mt-1 text-2xl font-bold tracking-wider bg-gradient-to-b from-green-900 to-gray-800 bg-clip-text text-transparent" style="font-family: sa;">About System</p>
                              </div>
                          </div>
                      </div>
                      <div class="row align-items-center">
                          <div class="col-lg-6">
  
                              <div class="about-img">
                                  <img src="../../assets/Homepage_images/carousel5.jpg" alt="Image" class="p-6">
                              </div>
  
                          </div>
                          <div class="col-lg-6">
                             
                              <div class="flex-1 h-full max-w-4xl p-3 mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 pb-2" style="max-height: 600px;overflow:scroll;">
                                  
                                  <p>
                                      <strong>Smart-Soil :</strong> is an innovative platform designed to empower farmers with data-driven decisions to maximize crop yields. 
                                      It utilizes <strong>machine learning algorithms</strong> to analyze soil data and predict the most suitable crops for specific soil conditions. 
                                      By integrating <strong>Arduino-based IoT devices</strong>, SoilSmart collects real-time data such as soil pH, temperature, moisture levels, and nutrient composition. 
                                      This data is then sent to a centralized <strong>API</strong> where advanced machine learning models process it and provide predictions and recommendations 
                                      on the optimal crops to plant.
                                  </p>
  
                                  <h6>Key Features</h6>
                                  <ul>
                                      <li><strong>Real-Time Data Collection:</strong> Arduino devices equipped with sensors continuously monitor soil conditions.</li>
                                      <li><strong>API Integration:</strong> Collected data is securely transmitted to the SoilSmart platform via APIs for processing.</li>
                                      <li><strong>Machine Learning Predictions:</strong> AI models analyze the soil data and predict suitable crops based on historical data, soil science, and weather patterns.</li>
                                      <li><strong>User-Friendly Dashboard:</strong> Farmers can access recommendations and reports through an intuitive interface on web or mobile devices.</li>
                                      <li><strong>Scalability:</strong> Supports small-scale and large-scale farming by customizing predictions based on specific needs.</li>
                                  </ul>
  
                                  <h6>Benefits</h6>
                                  <ul>
                                      <li>Optimized crop yields through precise recommendations.</li>
                                      <li>Reduction in resource waste (e.g., water, fertilizers).</li>
                                      <li>Enhanced soil health by planting compatible crops.</li>
                                      <li>Improved decision-making for farmers, promoting sustainable agriculture.</li>
                                  </ul>
  
                                  <h6>Vision</h6>
                                  <p>
                                      SoilSmart aims to revolutionize agriculture by combining <strong>IoT and AI technologies</strong> to address global food security challenges 
                                      while fostering sustainable farming practices.
                                  </p>

                                  <p class="text-center items-center justify-center">---- End ----</p>
  
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    data(){
      return {
         
      }
    },
  };
  </script>
  
  <style scoped>
  
      /* #ad_title{
          color: #E81C2E;
          font-size:20px;
          font-weight: bold;
      } */
  
      #ad_title {
        position: relative;
        display: inline-block;
      }
  
      #ad_title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 2px;
        background-color: black;
      }

  </style>
  