import {initializeApp, App} from 'firebase-admin/app';

function initFirebase(): App {
  return initializeApp({
    projectId: process.env.GCLOUD_PROJECT_ID,
  });
}

const firebaseApp = initFirebase();

export {firebaseApp};
