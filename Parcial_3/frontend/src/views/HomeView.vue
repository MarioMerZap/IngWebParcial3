<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Mensajes</h1>
    <button @click="$router.push('/new-message')" class="mb-4 bg-green-500 text-white px-4 py-2 rounded">Nuevo Mensaje</button>
    
    <input type="file" @change="uploadImage" class="mb-4" />
    <p v-if="imageUrl" class="text-sm text-gray-500">Imagen subida: {{ imageUrl }}</p>
    
    <ul>
      <li v-for="message in messages" :key="message._id" @click="selectMessage(message)"
          class="p-2 border-b cursor-pointer hover:bg-gray-100">
        <div class="flex justify-between">
          <span class="font-semibold">{{ message.asunto }}</span>
          <span class="text-sm text-gray-500">{{ formatDate(message.stamp) }}</span>
        </div>
        <p class="text-sm text-gray-700">De: {{ message.de }} - Para: {{ message.para }}</p>
      </li>
    </ul>
    
    <div v-if="selectedMessage" class="mt-4 p-4 border rounded-lg">
      <h2 class="text-xl font-semibold">{{ selectedMessage.asunto }}</h2>
      <p class="text-sm text-gray-500">De: {{ selectedMessage.de }} - Para: {{ selectedMessage.para }}</p>
      <p class="mt-2">{{ selectedMessage.contenido }}</p>
      <img v-if="selectedMessage.adjunto" :src="selectedMessage.adjunto" class="mt-2 w-64" />
      <button @click="reply" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Responder</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      selectedMessage: null,
      imageUrl: ''
    };
  },
  async created() {
    await this.fetchMessages();
  },
  methods: {
    async uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'tu_upload_preset');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', formData);
        this.imageUrl = response.data.secure_url;
      } catch (error) {
        console.error('Error al subir la imagen', error);
      }
    },
    async fetchMessages() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/messages', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.messages = response.data;
      } catch (error) {
        console.error('Error al obtener mensajes', error);
      }
    },
    selectMessage(message) {
      this.selectedMessage = message;
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    reply() {
      window.location.href = `${import.meta.env.VITE_URL}/reply?id=${this.selectedMessage._id}`;
    },
    newMessage() {
      this.$router.push({ name: 'NewMessage' });
    }
  }
};
</script>
