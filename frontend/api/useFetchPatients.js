// useFetchPatients.js

import { ref } from 'vue';

export const useFetchPatients = () => {
  const patients = ref(null);
  const pending = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    try {
      pending.value = true;
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization token if needed
        },
        body: JSON.stringify({
          query: `
            query GetAllPatients {
              getAllPatients {
                id
                firstname
                lastname
              }
            }
          `,
        }),
      });

      const result = await response.json();
      patients.value = result.data.getAllPatients;
    } catch (err) {
      error.value = err;
    } finally {
      pending.value = false;
    }
  };

  return {
    patients,
    pending,
    error,
    fetchData,
  };
};
