<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Página</RouterLink>
        <RouterLink to="/about">Principal</RouterLink>
      </nav>
    </div>
  

  <RouterView />

</template>
