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

          <li>
            <a class="px-2 text-white" href="#"
              >Login / Register</a
            >
          </li>
          <template >
            <li>
              <router-link class="px-2 text-white" :to="`/patient`">
                Patients' List</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

