<template>
  <main>
    <section class="mb-8 py-20 text-white text-center relative">
      <div class="container mx-auto">
        <div class="text-sky-500 main-header-content">
          <h1 class="font-bold text-5xl mb-5">Patient Files</h1>
        </div>
      </div>
    </section>
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Patients Files</span>

          <Icon
            name="mdi:patient-outline"
            class="fa fa-file-alt float-right text-sky-400 text-xl"
          ></Icon>
        </div>

        <ol>
          <PatientItem
            v-for="patient in patients"
            :key="patient.id"
            :patient="patient"
          />
        </ol>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useFetchPatients } from '@/api/useFetchPatients';

const { patients, pending, error, fetchData } = useFetchPatients();

onMounted(() => {
  fetchData();
});
</script>
