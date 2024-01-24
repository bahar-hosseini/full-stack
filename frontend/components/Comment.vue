<template>
  <main>
    <section class="w-full mb-8 py-14 text-center text-sky-700 relative">
      <div class="container mx-auto flex items-center">
        <div class="z-50 text-left ml-8">
          <div class="text-3xl font-bold">Dashboard</div>
        </div>
      </div>
    </section>

    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Comments</span>
          <i class="fa fa-comments float-right text-sky-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div></div>
          <form>
            <textarea
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            />
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-sky-600 block"
            >
              Submit
            </button>
          </form>
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>

    <ul class="container mx-auto">
      <li class="p-6 bg-gray-50 border border-gray-200">
        <div class="mb-5">
          <div class="font-bold"></div>
          <time>time</time>
          <button
            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
          >
            <Icon
              name="mingcute:close-fill"
            ></Icon>
          </button>
          <button
            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
          >
            <Icon name="ic:outline-edit"></Icon>
          </button>
        </div>
        <p>Comment content</p>
      </li>
    </ul>
  </main>
</template>
