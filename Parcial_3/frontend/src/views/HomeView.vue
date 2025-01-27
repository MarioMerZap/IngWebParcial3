<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Gestión de Películas y Salas</h1>

    <!-- Login de Usuario -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Login de Usuario</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            v-model="user.email"
            placeholder="Introduce tu email"
            class="border border-gray-300 rounded w-full px-3 py-2"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium">Contraseña</label>
          <input
            id="password"
            type="password"
            v-model="user.password"
            placeholder="Introduce tu contraseña"
            class="border border-gray-300 rounded w-full px-3 py-2"
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
      <div v-if="userLoggedIn" class="mt-4">
        <p class="text-green-600">Usuario autenticado: {{ user.email }}</p>
      </div>
    </div>

    <!-- Crear Película -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Crear Película</h2>
      <form @submit.prevent="createMovie" class="space-y-4">
        <div>
          <label for="movieTitle" class="block text-sm font-medium">Título</label>
          <input
            id="movieTitle"
            type="text"
            v-model="newMovie.title"
            placeholder="Título de la película"
            class="border border-gray-300 rounded w-full px-3 py-2"
          />
        </div>
        <div>
          <label for="moviePoster" class="block text-sm font-medium">Cartel</label>
          <input
            id="moviePoster"
            type="file"
            @change="handleFileUpload"
            class="border border-gray-300 rounded w-full px-3 py-2"
          />
        </div>

        <!-- Mostrar URL del póster cargado -->
        <div v-if="newMovie.posterUrl" class="mt-2">
          <p class="text-sm text-gray-600">
            URL del póster cargado: 
            <a 
              :href="newMovie.posterUrl" 
              target="_blank" 
              class="text-blue-500 underline"
            >
              {{ newMovie.posterUrl }}
            </a>
          </p>
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Crear Película</button>
      </form>
    </div>

    <!-- Buscar Película y Valorar -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Buscar Película</h2>
      <form @submit.prevent="searchMovie" class="space-y-4">
        <div>
          <label for="searchTitle" class="block text-sm font-medium">Título</label>
          <input
            id="searchTitle"
            type="text"
            v-model="searchTitle"
            placeholder="Título de la película a buscar"
            class="border border-gray-300 rounded w-full px-3 py-2"
          />
        </div>
        <button type="submit" class="bg-purple-500 text-white px-4 py-2 rounded">Buscar Película</button>
      </form>
      <div v-if="searchResults && searchResults.length > 0" class="mt-4">
        <h3 class="text-lg font-medium">Resultados de la búsqueda:</h3>
        <ul>
          <li v-for="result in searchResults" :key="result._id" class="border p-2 mb-2">
            <p><strong>Título:</strong> {{ result.title }}</p>
            <img :src="result.poster" alt="Cartel de la película" class="w-32 h-auto mt-2" />
            <p><strong>Proyecciones:</strong></p>
            <ul>
              <li v-for="projection in result.projections" :key="projection.roomId">
                Sala: {{ projection.roomName }}, Fecha: {{ new Date(projection.date).toLocaleString() }}
              </li>
            </ul>
            <!-- Valorar película -->
            <div v-if="userLoggedIn" class="mt-4">
              <label for="rating" class="block text-sm font-medium">Valorar esta película</label>
              <select v-model="ratings[result._id]" class="border border-gray-300 rounded w-full px-3 py-2">
                <option disabled value="">Selecciona una valoración</option>
                <option v-for="star in 5" :key="star" :value="star">{{ star }} estrellas</option>
              </select>
              <button @click="rateMovie(result._id)" class="bg-yellow-500 text-white px-4 py-2 rounded mt-2">
                Enviar valoración
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFileToCloudinary } from "@/services/uploadService";
import axios from "axios";


export default {
  name: "HomeView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      userLoggedIn: false,
      newMovie: {
        title: "",
        file: null,
        posterUrl: "", // Nueva propiedad para almacenar la URL del póster
      },
      ratings: {}, // Almacena las valoraciones de las películas
      searchTitle: "",
      searchResults: [],
    };
  },
  methods: {
    loginUser() {
      if (this.user.email && this.user.password) {
        this.userLoggedIn = true;
        alert("Inicio de sesión simulado con éxito.");
      } else {
        alert("Por favor, ingresa email y contraseña.");
      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newMovie.file = file;

        try {
          // Subimos el archivo a Cloudinary y almacenamos la URL
          const posterUrl = await uploadFileToCloudinary(file);
          this.newMovie.posterUrl = posterUrl;
        } catch (error) {
          console.error("Error cargando el archivo:", error);
          alert("No se pudo cargar el archivo.");
        }
      }
    },
    async createMovie() {
      try {
        if (!this.newMovie.file) {
          alert("Por favor, selecciona un archivo para el cartel.");
          return;
        }
        const posterUrl = await uploadFileToCloudinary(this.newMovie.file);
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/movies`, {
          title: this.newMovie.title,
          poster: posterUrl,
        });
        alert("Película creada con éxito.");
        this.newMovie.title = "";
        this.newMovie.file = null;
      } catch (error) {
        console.error("Error creando película:", error);
        alert("No se pudo crear la película.");
      }
    },
    async searchMovie() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movies/search`, {
          params: { title: this.searchTitle },
        });
        this.searchResults = response.data;
      } catch (error) {
        console.error("Error buscando película:", error);
        alert("No se pudo realizar la búsqueda.");
      }
    },
    async rateMovie(movieId) {
      try {
        if (!this.ratings[movieId]) {
          alert("Por favor, selecciona una valoración.");
          return;
        }
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/movies/${movieId}/rate`, {
          rating: this.ratings[movieId],
          user: this.user.email,
        });
        alert("Valoración enviada con éxito.");
      } catch (error) {
        console.error("Error enviando valoración:", error);
        alert("No se pudo enviar la valoración.");
      }
    },
  },
};
</script>

<style>
/* Agrega estilos si es necesario */
</style>
