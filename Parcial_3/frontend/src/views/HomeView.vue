<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet'; // Importar Leaflet
import 'leaflet/dist/leaflet.css';
import { getUserMarkers, addMarker, logVisit, getVisits } from '@/services/uploadService';

const userEmail = 'user@example.com'; // Email del usuario autenticado
const visitedEmail = ref(''); // Email del usuario cuyo mapa se quiere visitar
const markers = ref([]);
const map = ref(null);
const visits = ref([]); // Lista de visitas
const isViewingOwnMap = ref(true); // Para diferenciar si es el propio mapa o el de otro usuario

onMounted(async () => {
  // Inicializar mapa
  initializeMap();

  // Cargar marcadores propios al inicio
  await loadUserMap(userEmail);
});

const initializeMap = () => {
  map.value = L.map('map').setView([34, -43], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map.value);
};

const loadUserMap = async (email) => {
  // Resetear estado del mapa
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Circle) {
      map.value.removeLayer(layer);
    }
  });

  markers.value = [];
  const userMarkers = await getUserMarkers(email);
  userMarkers.forEach((marker) => {
    addMapMarker(marker.location.lat, marker.location.lon, marker.location.city || marker.location.country);
  });

  // Si es un mapa ajeno, registrar visita
  if (email !== userEmail) {
    isViewingOwnMap.value = false;
    const visitData = {
      visitedEmail: email,
      visitorEmail: userEmail,
      token: 'sample-token', // Simulando un token
      timestamp: new Date().toISOString(),
    };
    await logVisit(visitData);
    await loadVisits(email);
  } else {
    isViewingOwnMap.value = true;
    await loadVisits(email);
  }
};

const addMapMarker = (lat, lon, popupText) => {
  L.marker([lat, lon]).addTo(map.value).bindPopup(popupText).openPopup();
};

const address = ref('');
const addNewMarker = async () => {
  if (!address.value.trim()) return alert('Please enter an address.');

  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address.value)}`);
  const data = await response.json();
  if (data.length === 0) return alert('No results found.');

  const { lat, lon, display_name } = data[0];
  addMapMarker(lat, lon, display_name);

  // Guardar el marcador en la base de datos
  await addMarker({
    email: userEmail,
    country: display_name,
    city: '',
    lat,
    lon,
  });
};

const loadVisits = async (email) => {
  visits.value = await getVisits(email);
};

const visitOtherMap = async () => {
  if (!visitedEmail.value.trim()) return alert('Please enter a valid email.');
  await loadUserMap(visitedEmail.value);
};
</script>

<template>
  <main class="bg-gray-100 min-h-screen p-4">
    <div class="mb-8">
      <!-- Formulario para buscar otros mapas -->
      <div class="mb-6 bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">View Other User's Map</h2>
        <input
          v-model="visitedEmail"
          placeholder="Enter email to view map"
          class="p-2 border rounded w-full mb-4 focus:ring focus:ring-blue-200"
        />
        <button @click="visitOtherMap" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">View Map</button>
      </div>

      <!-- Input para buscar direcciones (solo si es el propio mapa) -->
      <div v-if="isViewingOwnMap" class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Add Marker</h2>
        <input v-model="address" placeholder="Enter an address" class="p-2 border rounded w-full mb-4 focus:ring focus:ring-blue-200" />
        <button @click="addNewMarker" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Add Marker</button>
      </div>
    </div>

    <!-- Mapa -->
    <div id="map" class="rounded shadow" style="height: 500px; width: 100%;"></div>

    <!-- Visitas -->
    <div class="mt-8 bg-white p-4 rounded shadow">
      <h3 class="text-xl font-semibold mb-4 text-gray-700">Visits</h3>
      <ul>
        <li
          v-for="visit in visits"
          :key="visit.timestamp"
          class="border-b py-4 last:border-none"
        >
          <p><strong class="text-gray-600">Email:</strong> {{ visit.visitorEmail }}</p>
          <p><strong class="text-gray-600">Timestamp:</strong> {{ new Date(visit.timestamp).toLocaleString() }}</p>
          <p><strong class="text-gray-600">Token:</strong> {{ visit.token }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>
