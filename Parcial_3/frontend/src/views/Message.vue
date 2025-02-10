<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">{{ message.asunto }}</h1>
      <p><strong>De:</strong> {{ message.de }}</p>
      <p><strong>Para:</strong> {{ message.para }}</p>
      <p>{{ message.contenido }}</p>
      <img v-if="message.adjunto" :src="message.adjunto" class="mt-4 w-48 rounded">
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { message: {} };
    },
    async created() {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/messages/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.message = response.data;
    }
  };
  </script>
  