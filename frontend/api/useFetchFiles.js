import { ref } from 'vue';

export const useFetchFiles = (patientId) => {
  const files = ref(null);
  const pending = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    try {
      pending.value = true;
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetAllFiles($patientId: ID!) {
              getAllFiles(patientId: $patientId) {
                id
                url
                name
                patient {
                  id
                  firstname
                  lastname
                }
              }
            }
          `,
          variables: {
            patientId: patientId.value,
          },
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
