<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <Icon
        name="ph:upload-fill"
        class="fas fa-upload float-right text-sky-400 text-2xl"
      ></Icon>
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

      <input type="file" multiple @change="upload($event)" class="mt-3" />

      <hr class="my-6" />

      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <div class="font-bold text-sm" :class="upload.text_class">
          <Icon :name="upload.icon"></Icon> {{ upload.name }}
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
import { storage, filesCollection } from '@/includes/firebase';

const is_dragover = ref(false);
const uploads = ref([]);
const firstName = ref('');
const familyName = ref('');

const route = useRoute();

async function upload($event) {
  is_dragover.value = false;

  const files = $event.dataTransfer
    ? [...$event.dataTransfer.files]
    : [...$event.target.files];

  uploads.value = [];

  files.forEach((file) => {
    if (checkExcelFile(file)) {
      const data = readCsvFile(file);
      firstName.value = data[0]['First Name'];
      familyName.value = data[0]['Family Name'];
    }

    const storageRef = storage.ref();
    const filesRef = storageRef.child(`files/${file.name}`);
    const task = filesRef.put(file);

    const uploadIndex =
      this.uploads.push({
        task,
        current_progress: 0,
        name: file.name,
        variant: 'bg-blue-400',
        icon: 'line-md:loading-alt-loop',
        text_class: '',
      }) - 1;

    task.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploads[uploadIndex].current_progress = progress;
      },
      (error) => {
        this.uploads[uploadIndex].variant = 'bg-red-400';
        this.uploads[uploadIndex].icon = 'nonicons:error-16';
        this.uploads[uploadIndex].text_class = 'text-red-400';
        console.log(error);
      },
      async () => {
        const file = {
          // uid: 'i\'ll add it after auth',
          patient_id: route.params.id,
          name: task.snapshot.ref.name,
        };

        file.url = await task.snapshot.ref.getDownloadURL();
        const fileRef = await filesCollection.add(file);
        const fileSnapshot = await fileRef.get();

        // this.addFile(fileSnapshot);

        this.uploads[uploadIndex].variant = 'bg-sky-400';
        this.uploads[uploadIndex].icon = 'lets-icons:done-fill';
        this.uploads[uploadIndex].text_class = 'text-sky-400';
      }
    );
  });
}
</script>
