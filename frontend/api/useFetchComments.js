export const useFetchComments = (fileId) => {
  const comments = ref(null);
  const pending = ref(false);
  const error = ref(null);

  const fetchComments = async () => {
    try {
      pending.value = true;
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetComments($fileId: ID!) {
              getComments(fileId: $fileId) {
                id
                text
                datePosted
              }
            }
          `,
          variables: {
            fileId,
          },
        }),
      });

      const result = await response.json();
      comments.value = result.data.getComments;
    } catch (err) {
      error.value = err;
    } finally {
      pending.value = false;
    }
  };

  return {
    comments,
    pending,
    error,
    fetchComments,
  };
};
