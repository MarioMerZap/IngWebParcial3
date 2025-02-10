<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Mensajes</h1>
    <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded mb-4">Cerrar sesión</button>
    
    <div v-for="msg in messages" :key="msg.id" class="p-4 border rounded mb-2">
      <h2 class="font-bold">{{ msg.asunto }}</h2>
      <p>De: {{ msg.de }} | Para: {{ msg.para }}</p>
      <p>{{ msg.contenido }}</p>
      <img v-if="msg.adjunto" :src="msg.adjunto" class="w-40 h-40">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { messages: [] };
  },
  methods: {
    async fetchMessages() {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.messages = await res.json();
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.fetchMessages();
  }
};
</script>
