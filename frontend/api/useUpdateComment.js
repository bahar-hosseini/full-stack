export const useUpdateComment = (id, text, datePosted) => {
  const apiUrl = 'http://localhost:4000/graphql';

  const updateComment = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation UpdateComment($id: ID!, $text: String!,$datePosted:String!) {
              updateComment(id: $id, text: $text,datePosted:$datePosted) {
                id
                text
              }
            }
          `,
          variables: {
            id,
            text,
            datePosted,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return result.data.updateComment;
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      throw new Error('Error updating comment');
    }
  };

  return updateComment;
};
