<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { defineComponent } from 'vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

export default defineComponent({
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DefaultLayout;
      return layout;
    }
  }
});
</script>

<style scoped>
/* Global styles */
</style>
