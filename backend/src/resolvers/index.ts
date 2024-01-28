import {db , auth} from '../firebase/config.js'
import admin from 'firebase-admin';

export const resolvers = {
  Query: {
    getAllPatients: async () => {
      try {
        const patientsSnapshot = await db.collection('patients').get();
        const patients = patientsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return patients;
      } catch (error) {
        throw new Error('Error fetching patients');
      }
    },
    getAllFiles: async (_, { patientId }) => {
      try {
        const filesSnapshot = await db
          .collection('files')
          .where('patient_id', '==', patientId)
          .get();
  
        const files = filesSnapshot.docs.map(async (doc) => {
          const fileData = doc.data();
          const patientSnapshot = await db
            .collection('patients')
            .doc(fileData.patient_id)
            .get();
  
          const patientData = patientSnapshot.data();
  
          return {
            id: doc.id,
            ...fileData,
            patient: {
              id: patientSnapshot.id,
              ...patientData,
            },
          };
        });
  
        return Promise.all(files);
      } catch (error) {
        throw new Error('Error fetching files');
      }
    },
    getComments: async (_, { fileId }) => {
      try {
        const commentsSnapshot = await db
          .collection('comments')
          .where('fileId', '==', fileId)
          .get();

        const comments = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return comments;
      } catch (error) {
        throw new Error('Error fetching comments');
      }
    },

  },
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
        const customToken = await admin.auth().createCustomToken(uid);

        return {
          token: customToken,
          name: userDoc.data().name,
          email: userDoc.data().email,
          position: userDoc.data().position,
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
    
      const customToken = await admin.auth().createCustomToken(userCred.uid);
    
      await db.collection('users').doc(userCred.uid).set({
        uid: userCred.uid,
        name,
        email,
        password,
        position,
      });
      return {
        token: customToken,
        uid: userCred.uid,
        name,
        email,
        password,
        position,
      };
    },
    

    addPatient: async (_, { firstname, lastname }) => {
      try {
        const patientRef = await db.collection('patients').add({
          firstname,
          lastname,
        });

        return {
          id: patientRef.id,
          firstname,
          lastname,
        };
      } catch (error) {
        throw new Error('Error adding patient');
      }
    },

    addComment: async (_, { text, fileId ,datePosted}) => {
      try {
        await db.collection('comments').add({
          text,
          fileId,
          datePosted
        });

        return {
          text,
          fileId,
          datePosted
        };
      } catch (error) {
        throw new Error('Error adding comment');
      }
    },

    deleteComment: async (_, { id }) => {
      try {
        await db.collection('comments').doc(id).delete();

        return {
          success: true,
          message: 'Comment deleted successfully',
        };
      } catch (error) {
        throw new Error('Error deleting comment');
      }
    },

    updateComment: async (_, { id, text,datePosted }) => {
      try {
        await db.collection('comments').doc(id).update({ text,datePosted });
        return {
          success: true,
          message: 'Comment updated successfully',
        };
      } catch (error) {
        console.error('Error updating comment:', error);
        throw new Error('Error updating comment');
      }
    },

    addFile: async (_, { id, url }) => {
      try {
        const fileRef = await db.collection('files').doc(id).set({
          url,
        });

        return {
          id,
          url,
        };
      } catch (error) {
        console.error('Error adding file:', error);
        throw new Error('Error adding file');
      }
    },
  },
};