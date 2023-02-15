<template>
  <div class="app-loader">
    <div class="preloader-wrapper small active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  type Colors = string[];

  export default defineComponent({
    computed: {
      color() {
        const colors: Colors = ['spinner-green-only', 'spinner-blue-only'];
        return colors[Math.floor(Math.random() * 3)]
      }
    }
  });
</script>
