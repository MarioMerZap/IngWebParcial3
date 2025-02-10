<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Nuevo Mensaje</h1>
      <form @submit.prevent="sendMessage">
        <div class="mb-4">
          <label class="block text-gray-700">Para:</label>
          <input type="email" v-model="message.para" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Asunto:</label>
          <input type="text" v-model="message.asunto" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Contenido:</label>
          <textarea v-model="message.contenido" class="w-full p-2 border rounded" rows="4" required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Adjuntar imagen:</label>
          <input type="file" @change="uploadImage" class="w-full p-2 border rounded" />
          <p v-if="message.adjunto" class="mt-2 text-sm text-gray-500">URL de la imagen: {{ message.adjunto }}</p>
        </div>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: {
          para: '',
          asunto: '',
          contenido: '',
          adjunto: ''
        }
      };
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
          this.message.adjunto = response.data.secure_url;
        } catch (error) {
          console.error('Error al subir la imagen', error);
        }
      },
      async sendMessage() {
        try {
          const token = localStorage.getItem('token');
          await axios.post('/api/messages', this.message, {
            headers: { Authorization: `Bearer ${token}` }
          });
          window.location.href = `${import.meta.env.VITE_URL}/home`;
        } catch (error) {
          console.error('Error al enviar mensaje', error);
        }
      }
    }
  };
  </script>
  