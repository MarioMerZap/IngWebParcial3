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
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Obtener la URL del backend desde las variables de entorno
      window.location.href = `${apiBaseUrl}/auth/google`; // Redirigir dinámicamente
    }
  }
};
</script>
