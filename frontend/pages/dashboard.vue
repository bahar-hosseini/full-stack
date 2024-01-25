<template>
  <main>
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <UploadFile ref="upload" />
        </div>
        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">Patients File</span>
              <Icon
                name="solar:file-bold"
              ></Icon>
            </div>
            <div class="p-6">
<FileItem />

            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
