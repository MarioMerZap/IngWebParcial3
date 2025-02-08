<template>
    <div class="flex items-center justify-center min-h-screen">
      <button @click="loginWithGoogle" class="bg-blue-500 text-white px-4 py-2 rounded">
        Iniciar sesión con Google
      </button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      loginWithGoogle() {
        window.location.href = 'http://localhost:5000/auth/google'; // Redirige al backend
      }
    }
  };
  </script>
  