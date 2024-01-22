import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { Auth } from 'firebase-admin/lib/auth/auth';

dotenv.config({ path: './.env' });

const serviceAccount: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const db = admin.firestore();
const auth = admin.auth() as admin.auth.Auth;

interface MyContext {
  token?: String;
}

const typeDefs = `#graphql
   type Query {
     hello: String
     getDataFromFirestore: String
   }
   type Mutation {
     writeToFirestore(data: String!): String
   }

`;

const resolvers = {
  Mutation: {
    writeToFirestore: async (_, { data }) => {
      await db.collection('messages').doc('greeting').set({ message: data });
      return 'Data written to Firestore successfully!';
    },
  },
};

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
