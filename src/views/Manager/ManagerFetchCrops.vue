<template>
  <div>

    <section class="section profile">
      <div class="flex flex-wrap xl:flex-nowrap m-2">
        <!-- Left Column -->
        <div class="w-full xl:w-4/4 mb-4">

          <div class="card border rounded-lg shadow-md mt-4">
            <div class="card-body p-1">
              <div  style="max-height: 400px;overflow: auto;">
                <h4 class="text-center sticky top-0 z-50 p-2 bg-white">Crop's data</h4>
    
            
                
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>  

  </div>
</template>

#### 2. **Script (for handling confirmation)**

```javascript
<script>

export default {
  data() {
    return {
     
    };
  },
  mounted() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    }
  },
  methods: {
    
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #4CAF50;
}

.bg-primary:hover {
  background-color: #45a049;
}

input:focus {
  border-color: #4CAF50;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px;
}

li:hover {
  background-color: #f0f0f0;
}

.selected-item {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 15px;
}

.selected-item button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
