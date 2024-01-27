<template>
  <div>
    <div class="text-white text-center font-bold p-4 mb-4">
      <p>message</p>
    </div>
    <form method="post">
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <input
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <input
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
