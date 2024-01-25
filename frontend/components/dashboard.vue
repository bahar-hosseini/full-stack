<template>
  <main>
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <UploadFile ref="upload" />
        </div>
        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">Patients File</span>
              <Icon name="pepicons-pop:file" class="fa fa-compact-disc float-right text-sky-400 text-2xl mr-3"></Icon>
            </div>
            <div class="p-6">
              <FileItem v-for="(file,i) in files" :key="file.id" :file="file" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { useFetchFiles } from '@/api/useFetchFiles';
const route = useRoute()
const patientId = ref(route.params.id);
const { files, pending, error, fetchData } = useFetchFiles(patientId);

watch(() => {
  fetchData();
});
</script>
