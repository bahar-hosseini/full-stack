<template>
  <div>
    <h1>Test</h1>
    <ul>
      <PatientItem
        v-for="patient in patients"
        :key="patient.id"
        :patient="patient"
      />
    </ul>
  </div>
</template>

<script setup>
import { useFetchPatients } from '@/api/useFetchPatients';

const { patients, pending, error, fetchData } = useFetchPatients();

onMounted(() => {
  fetchData();
});
</script>
