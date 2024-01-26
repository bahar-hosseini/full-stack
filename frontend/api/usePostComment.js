export const usePostComment = () => {
  const addedComment = ref(null);
  const pending = ref(false);
  const error = ref(null);

  const postComment = async (text, fileId) => {
    try {
      pending.value = true;
      const apiUrl = 'http://localhost:4000/graphql';
      const variables = {
        text,
        fileId: fileId.toString(),
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
    mutation AddComment($text: String!, $fileId: ID!) {
      addComment(text: $text, fileId: $fileId) {
        text
        fileId
      }
    }
    `,
          variables,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        addedComment.value = result.data.addComment;
      } else {
        error.value = new Error(result.errors[0].message);
        throw error.value;
      }
    } catch (err) {
      console.error('Error:', err);
      throw new Error('Error adding comment');
    } finally {
      pending.value = false;
    }
  };

  return {
    addedComment,
    pending,
    error,
    postComment,
  };
};
