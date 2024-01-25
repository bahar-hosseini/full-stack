import { ref } from 'vue'

export default function useAddFile() {
  const files = ref(null);
  const pending = ref(false);
  const error = ref(null);

  const fetchFiles = async () => {
    try {
      pending.value = true;
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetAllFiles {
              getAllFiles {
                id
                name
                url
              }
            }
          `,
        }),
      });

      const result = await response.json();
      files.value = result.data.getAllFiles;
    } catch (err) {
      error.value = err;
    } finally {
      pending.value = false;
    }
  };

  return {
    files,
    pending,
    error,
    fetchData,
  };
};
