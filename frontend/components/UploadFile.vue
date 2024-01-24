<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-sky-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-sky-400 hover:border-sky-400 hover:border-solid"
        :class="{ 'bg-sky-400 border-sky-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />

      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded-lg">
          <div
            :class="upload.variant"
            class="transition-all progress-bar"
            :style="{ width: `${upload.current_progress}%` }"
          ></div>
        </div>
      </div>
    </div>
    

  </div>
  <div v-if="firstName || familyName" class="my-4">
      <p v-if="firstName">First Name: {{ firstName }}</p>
      <p v-if="familyName">Family Name: {{ familyName }}</p>
    </div>
</template>

<script setup>
const is_dragover = ref(false);
const uploads = ref([]);
const firstName = ref('');
const familyName = ref('');

async function upload($event) {
  is_dragover.value = false;

  const files = $event.dataTransfer
    ? [...$event.dataTransfer.files]
    : [...$event.target.files];

  uploads.value = [];
  for (const file of files) {
    try {
      const data = await readCsvFile(file);
      console.log('CSV Data:', data);
      console.log('first name', data[0]['First Name']);
      console.log('first name', data[0]['Family Name']);

      firstName.value = data[0]['First Name'];
      familyName.value = data[0]['Family Name'];

      uploads.value.push({
        name: file.name,
        icon: 'fas fa-file-csv',
        text_class: 'text-sky-500',
        variant: 'bg-sky-500',
        current_progress: 100,
      });
    } catch (error) {
      console.error('Error reading CSV file:', error);

      uploads.value.push({
        name: file.name,
        icon: 'fas fa-exclamation-circle',
        text_class: 'text-red-500',
        variant: 'bg-red-500',
        current_progress: 100,
      });
      
    }
  }
}
</script>
