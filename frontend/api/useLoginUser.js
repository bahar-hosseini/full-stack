const loginUser = async function(email, password) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation LoginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
              name
              email
              position
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Login failed:', result.errors[0].message);
    } else {
      const user = result.data.loginUser;
      console.log('User logged in:', user);
      return user;
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};

export default loginUser;
