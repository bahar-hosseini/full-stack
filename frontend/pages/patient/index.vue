<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <ul>
          <li v-for="patient in patients" :key="patient.id">
            <NuxtLink :to="'/patient/' + patient.id">
              {{ patient.firstname }} {{ patient.lastname }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFetchPatients } from '@/api/useFetchPatients';

const { patients, pending, error, fetchData } = useFetchPatients();

onMounted(() => {
  fetchData();
});
</script>
