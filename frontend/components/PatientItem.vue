<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <NuxtLink
        :to="`/patient/${patient.id}`"
        class="font-bold block text-gray-600"
      >
        {{ patient.firstname }} {{ patient.lastname }}
      </NuxtLink>
      <span class="text-gray-500 text-sm">
        {{ patient.display_name }}
      </span>
      <span class="text-gray-500 text-sm"> </span>
    </div>

    <div class="text-gray-600 text-lg">
      <Icon name="teenyicons:user-solid" color="sky" />
    </div>
  </li>
</template>

<script setup>
const props = defineProps(['patient']);
</script>

