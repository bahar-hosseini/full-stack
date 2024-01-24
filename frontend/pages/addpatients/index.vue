<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <upload-file ref="upload"/>
        </div>
        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">Patients</span>
              <i
                class="fa fa-compact-disc float-right text-sky-400 text-2xl"
              ></i>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  </main>
</template>