export const useDeleteComment = (commentId) => {
  const apiUrl = 'http://localhost:4000/graphql';

  const deleteComment = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation DeleteComment($id: ID!) {
              deleteComment(id: $id) {
                id
              }
            }
          `,
          variables: {
            id: commentId,
          },
        }),
      });
      const result = await response.json();
      if (response.ok) {
        return result.data.deleteComment;
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      throw new Error('Error deleting comment');
    }
  };

  return deleteComment;
};
