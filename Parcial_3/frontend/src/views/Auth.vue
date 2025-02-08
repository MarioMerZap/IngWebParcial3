<template>
    <div>Cargando...</div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
  
      if (token) {
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    }
  };
  </script>
  