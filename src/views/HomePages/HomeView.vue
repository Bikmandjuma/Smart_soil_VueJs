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
                                  
                                  <h4>IoT and AI-Driven Crop Recommendation System</h4>
    
                                    <p>Agriculture is a critical sector that requires innovative solutions to overcome challenges such as unpredictable weather patterns, inefficient resource management, and poor crop selection. This project introduces an IoT and AI-Driven Crop Recommendation System, designed to assist farmers in making data-driven decisions to enhance productivity, sustainability, and economic viability.</p>
                                    
                                    <h6>Key Features</h6>
                                    <ul style="list-style-type:square;">
                                        <li><strong>Real-time Data Collection:</strong> IoT-enabled sensors monitor environmental factors like soil moisture, temperature, humidity, and pH levels.</li>
                                        <li><strong>Cloud-Based Data Processing:</strong> Secure storage and processing of real-time and historical data to ensure accessibility and efficient analysis.</li>
                                        <li><strong>AI-Powered Crop Recommendation:</strong> Machine learning models analyze collected data and provide optimal crop suggestions tailored to specific soil and climate conditions.</li>
                                        <li><strong>User-Friendly Interface:</strong> Mobile and web applications provide intuitive dashboards displaying actionable insights.</li>
                                        <li><strong>Predictive Analysis:</strong> AI algorithms forecast weather trends and potential agricultural risks.</li>
                                        <li><strong>Sustainability & Resource Optimization:</strong> Reduces water wastage, promotes eco-friendly practices, and minimizes financial losses.</li>
                                    </ul>
                                    
                                    <h6>How It Works</h6>
                                    <ol style="list-style-type:square;">
                                        <li><strong>Data Collection:</strong> IoT sensors placed in agricultural fields gather data on soil health and environmental conditions.</li>
                                        <li><strong>Data Transmission:</strong> The collected data is sent to a cloud platform via wireless communication protocols.</li>
                                        <li><strong>AI Analysis:</strong> Machine learning models process the data, comparing it with historical records and market trends to generate crop recommendations.</li>
                                        <li><strong>Decision Support:</strong> Farmers receive real-time insights through an interactive web or mobile interface, helping them make informed decisions.</li>
                                    </ol>
                                    
                                    <h6>Why Choose This System?</h6>
                                    <ul style="list-style-type:square;">
                                        <li><strong>Enhanced Precision Farming:</strong> Data-driven decision-making ensures better yields and efficient resource usage.</li>
                                        <li><strong>Adaptation to Climate Change:</strong> AI-powered recommendations help mitigate risks associated with unpredictable weather patterns.</li>
                                        <li><strong>Economic Growth:</strong> Increases profitability by suggesting the most viable crops based on market demand.</li>
                                        <li><strong>Government Policy Alignment:</strong> Supports Rwanda’s Vision 2050 for agricultural modernization.</li>
                                    </ul>
                                    
                                    <h6>Target Users</h6>
                                    <ul style="list-style-type:square;">
                                        <li>Smallholder and large-scale farmers</li>
                                        <li>Agricultural policymakers and government institutions (e.g., MINAGRI Rwanda)</li>
                                        <li>Research institutions focused on agricultural innovation</li>
                                    </ul>
                                    
                                    <h6>Technical Aspects</h6>
                                    <h7>IoT Sensors Used:</h7>
                                    <ul style="list-style-type:square;">
                                        <li>Soil moisture sensors</li>
                                        <li>Temperature and humidity sensors</li>
                                        <li>pH level sensors</li>
                                    </ul>
                                    
                                    <h6>AI Models Implemented:</h6>
                                    <ul style="list-style-type:square;">
                                        <li>Decision Trees</li>
                                        <li>Random Forest</li>
                                        <li>Support Vector Machines (SVM)</li>
                                    </ul>
                                    
                                    <h6>Cloud Technologies:</h6>
                                    <ul style="list-style-type:square;">
                                        <li>AWS/Azure/Google Cloud for data storage</li>
                                        <li>Firebase for real-time database management</li>
                                    </ul>
                                    
                                    <h6>User Interface:</h6>
                                    <ul style="list-style-type:square;">
                                        <li>Web-based dashboard (VueJS , flask and Laravel)</li>
                                        <li>Mobile application (Android/iOS)</li>
                                    </ul>
                                    
                                    <h6>Expected Impact</h6>
                                    <ul style="list-style-type:square;">
                                        <li>Improved agricultural productivity and food security.</li>
                                        <li>Reduction of farming costs by optimizing resource allocation.</li>
                                        <li>Increased farmer incomes through better crop choices.</li>
                                        <li>Promotion of sustainable farming practices in Rwanda and beyond.</li>
                                    </ul>

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
  h4, h6 {
    font-family: sa;
    font-weight: bold;
    /* Other styles */
  }
  
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
  