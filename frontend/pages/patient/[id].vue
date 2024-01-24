<template>
  <div>
    event id test
  </div>
</template>
<script setup>
const route = useRoute();
console.log(route.params.id);
</script>