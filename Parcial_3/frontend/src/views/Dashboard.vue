<template>
    <div>
      <h1>Bienvenido</h1>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
  };
  </script>
  