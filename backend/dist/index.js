import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import admin from 'firebase-admin';
dotenv.config({ path: './.env' });
const serviceAccount = {
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const app = express();
const db = admin.firestore();
const auth = admin.auth();
const typeDefs = `#graphql
   type Query {
     hello: String
     getDataFromFirestore: String
   }
   type Mutation {
     writeToFirestore(data: String!): String
   }

   

 type User {
  id: ID!
   name: String!
   email: String!
   password:String!
   position:String!
 }

 type Mutation {
  writeToFirestore(data: String!): String
  loginUser(email: String!, password: String!): User
  createUser(name: String!, email: String!, password: String!, position: String!): User
}

`;
const resolvers = {
    Mutation: {
        loginUser: async (_, { email, password }) => {
            try {
                const userCredential = await admin.auth().getUserByEmail(email);
                const uid = userCredential.uid;
                const userDoc = await admin
                    .firestore()
                    .collection('users')
                    .doc(uid)
                    .get();
                if (!userDoc.exists) {
                    throw new Error('User not found');
                }
                return {
                    name: userDoc.data().name,
                    email: userDoc.data().email,
                };
            }
            catch (error) {
                throw new Error('Invalid credentials');
            }
        },
        createUser: async (_, { name, email, password, position }) => {
            const userCred = await auth.createUser({
                email,
                password,
            });
            await db.collection('users').doc(userCred.uid).set({
                uid: userCred.uid,
                name,
                email,
                position,
            });
            return {
                uid: userCred.uid,
                name,
                email,
                position,
            };
        },
    },
};
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
