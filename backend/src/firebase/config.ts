import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const serviceAccount: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth() as admin.auth.Auth;

export {db, auth}