<template>
  <main>
    <section
      class="w-full mb-8 py-14 text-center text-sky-700 relative"
    ></section>
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Comments</span>
          <i class="fa fa-comments float-right text-sky-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <form @submit.prevent="submitComment">
            <textarea
              v-model="commentText"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></textarea>
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
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </section>

    <ul class="container mx-auto">
      <li
        v-for="(comment, index) in comments"
        :key="index"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <div class="mb-5">
          <time>{{ comment.createdAt }}</time>
          <button
            @click="deleteCommentHandler(comment.id)"
            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
          >
            <Icon name="mingcute:close-fill"></Icon>
          </button>

          <button
            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
          >
            <Icon name="ic:outline-edit"></Icon>
          </button>
        </div>

        <p>{{ comment.text }}</p>
      </li>
    </ul>
  </main>
</template>
<script setup>
import { useDeleteComment } from '@/api/useDeleteComment';
import { usePostComment } from '@/api/usePostComment';
import { useFetchComments } from '@/api/useFetchComments';

const commentText = ref('');

const route = useRoute();
const fileId = route.params.id;

const { comments, fetchComments } = useFetchComments(fileId);

const { postComment } = usePostComment();
const { deleteComment } = useDeleteComment();

const submitComment = async () => {
  try {
    await postComment(commentText.value, fileId);

    commentText.value = '';
    fetchComments(fileId);
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

const deleteCommentHandler = async (commentId) => {
  try {
    const deleteComment = useDeleteComment(commentId);
    await deleteComment();
    fetchComments(fileId);
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

onMounted(() => {
  fetchComments(fileId);
});
</script>
