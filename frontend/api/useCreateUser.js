const createUser = async function(name, email, password, position) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateUser($name: String!, $email: String!, $password: String!, $position: String!) {
            createUser(name: $name, email: $email, password: $password, position: $position) {
              id
              name
              email
              password
              position
            }
          }
        `,
        variables: {
          name: name,
          email: email,
          password: password,
          position: position,
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('User creation failed:', result.errors[0].message);
    } else {
      const user = result.data.createUser;
      console.log('User created:', user);
      return user;
    }
  } catch (error) {
    console.error('User creation failed:', error.message);
    throw error;
  }
};

export default createUser;
