<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Mensajes</h1>
      <ul>
        <li v-for="msg in messages" :key="msg._id" class="border-b py-2">
          <router-link :to="`/message/${msg._id}`">
            <strong>{{ msg.asunto }}</strong> - {{ msg.para }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { messages: [] };
    },
    async created() {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.messages = response.data;
    }
  };
  </script>
  