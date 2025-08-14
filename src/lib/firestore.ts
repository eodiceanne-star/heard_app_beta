import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Types for our data
export interface SymptomEntry {
  id?: string;
  userId: string;
  date: string;
  mood: string;
  dietNotes: string;
  painLevel: number;
  painLocation: string;
  notes: string;
  createdAt: Timestamp;
}

export interface Appointment {
  id?: string;
  userId: string;
  title: string;
  date: string;
  time: string;
  notes: string;
  reminder: boolean;
  createdAt: Timestamp;
}

export interface CustomQuestion {
  id?: string;
  userId: string;
  question: string;
  createdAt: Timestamp;
}

export interface MusicTrack {
  id?: string;
  userId: string;
  title: string;
  artist: string;
  url: string;
  createdAt: Timestamp;
}

// Symptom Entries
export const addSymptomEntry = async (entry: Omit<SymptomEntry, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'symptomEntries'), {
      ...entry,
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getSymptomEntries = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'symptomEntries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { entries, error: null };
  } catch (error: any) {
    return { entries: [], error: error.message };
  }
};

// Appointments
export const addAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointment,
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getAppointments = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', userId),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { appointments, error: null };
  } catch (error: any) {
    return { appointments: [], error: error.message };
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'appointments', id));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Custom Questions
export const addCustomQuestion = async (question: Omit<CustomQuestion, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'customQuestions'), {
      ...question,
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getCustomQuestions = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'customQuestions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { questions, error: null };
  } catch (error: any) {
    return { questions: [], error: error.message };
  }
};

export const deleteCustomQuestion = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'customQuestions', id));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Music Tracks
export const addMusicTrack = async (track: Omit<MusicTrack, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'musicTracks'), {
      ...track,
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getMusicTracks = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'musicTracks'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const tracks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { tracks, error: null };
  } catch (error: any) {
    return { tracks: [], error: error.message };
  }
};

export const deleteMusicTrack = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'musicTracks', id));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};
