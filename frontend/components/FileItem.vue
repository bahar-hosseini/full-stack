<template>
  <div v-if="file.patient">
    Patient: {{ file.patient.firstname }} {{ file.patient.lastname }}
  </div>
  <div>
    <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50">
      <div>
        <NuxtLink :to="`/file/${file.id}`" class="font-bold block text-gray-600">
          <span class="font-bold block text-gray-600">{{ file.name }}</span>
        </NuxtLink>
      </div>
      <div class="text-gray-600 text-lg">
        <span class="comments">
          <Icon name="iconamoon:comment-fill" class="fa fa-comments text-gray-600"></Icon>
          0
        </span>
      </div>
    </li>
  </div>
</template>

<script setup>
const { file } = defineProps(['file']);

</script>
