<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Autenticando...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      this.$router.push('/dashboard');
    } else {
      this.$router.push('/login');
    }
  }
};
</script>
