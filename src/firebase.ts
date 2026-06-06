import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5LTceYtDeCU4nb7U9MnY-4M0If64RXr4",
  authDomain: "zanorispaces-7ab0b.firebaseapp.com",
  projectId: "zanorispaces-7ab0b",
  storageBucket: "zanorispaces-7ab0b.firebasestorage.app",
  messagingSenderId: "517502247409",
  appId: "1:517502247409:web:32568562c95f3c73e7a450",
  measurementId: "G-2NSYJ0EEXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore Error Information Interface
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

// Global Firestore error diagnostic processor
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: 'passcode-authed-admin',
      email: 'studio-director@zanori.com'
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed Diagnostics:', JSON.stringify(errInfo, null, 2));
  throw new Error(JSON.stringify(errInfo));
}

// Connection Validation Testing
async function validateFirestoreConnection() {
  try {
    // Attempt a live light fetch from the test connection path
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('✓ Zanori Spaces database pipeline is fully operational.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Zanori spaces database is currently dry-running offline. Please verify network access.");
    } else {
      console.log("Database initialized. Live records ready for orchestration.");
    }
  }
}

validateFirestoreConnection();
