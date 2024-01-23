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

 type User {
  id: ID!
   name: String!
   email: String!
   password:String!
   position:String!
 }

 type Comment {
    id: ID!
    text: String!
  }

  type Patient {
    id: ID!
    firstname: String!
    lastname: String!
    comments:[Comment]
  }

 type Mutation {
    loginUser(email: String!, password: String!): User
     createUser(name: String!, email: String!, password: String!, position: String!): User
     addComment(text: String!, patientId: ID!): Comment
     deleteComment(id: ID!): Comment
     updateComment(id: ID!, text: String!, patientId: ID!): Comment
     addPatient(firstname: String!, lastname: String!): Patient
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
      } catch (error) {
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

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
