<template>
  <div>
    <div class="text-white text-center font-bold p-4 mb-4">
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        class="block w-full bg-teal-400 text-white py-1.5 px-3 rounded transition hover:bg-teal-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script setup>

import { useRouter } from 'vue-router';


const email = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

const handleSubmit = async () => {
  try {
    await userStore.authenticate({ email: email.value, password: password.value });
    if (userStore.userLoggedIn) {
      router.push('/patient');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>
