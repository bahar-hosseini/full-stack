<template>
  <div class="text-white text-center font-bold p-4 rounded mb-4">
    <p>Notification</p>
  </div>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <input
        v-model="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
    </div>

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
<div class="mb-3">
      <label class="inline-block mb-2">Position</label>
      <select
        v-model="position"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Doctor">Doctor</option>
        <option value="Assistance">Assistance</option>
      </select>
    </div> 
    <button
      type="submit"
      class="block w-full bg-teal-400 text-white py-1.5 px-3 rounded transition hover:bg-teal-600"
    >
      Submit
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import createUser from '@/api/useCreateUser';

const name = ref('');
const email = ref('');
const password = ref('');
const position = ref('Doctor')
const router = useRouter();

const handleSubmit = async () => {
  try {
    const user = await createUser(name.value, email.value, password.value,position.value);
    if (user) {
      router.push('/patient')
    }
  } catch (error) {
    console.error('User creation failed:', error.message);
  }
};
</script>
