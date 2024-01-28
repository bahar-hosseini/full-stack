<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">

      <div
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active"
      >
        Sentry Health
      </div>

      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">

          <li v-if="!isLoggedin">
            <NuxtLink class="px-2 text-white" :to="`/`">
              Login / Register
            </NuxtLink>
          </li>
          <template v-else>
            <li>
              <NuxtLink class="px-2 text-white" :to="`/patient`">
                Patients' List
              </NuxtLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">
                Logout
              </a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

const { userLoggedIn, signOut } = useUserStore();
const isLoggedin = userLoggedIn;
</script>
