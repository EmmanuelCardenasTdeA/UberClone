// AI-assisted: see docs/AI_LOG.md #5
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '../config/firebaseConfig';

const COLLECTION = 'drivers';

/**
 * Creates or updates a driver document. The document id is the driver's
 * identity document number, so the same person cannot register twice.
 * `createdAt` is only written the first time.
 */
export const saveDriver = async (driverId, driverData) => {
  const ref = doc(db, COLLECTION, driverId);
  const snap = await getDoc(ref);

  await setDoc(
    ref,
    {
      ...driverData,
      driverId,
      updatedAt: serverTimestamp(),
      ...(snap.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  );
};

export const getDriver = async (driverId) => {
  const snap = await getDoc(doc(db, COLLECTION, driverId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

/** Returns the driver that already uses this plate (other than `excludeDriverId`), or null. */
export const findDriverByLicensePlate = async (licensePlate, excludeDriverId) => {
  const q = query(
    collection(db, COLLECTION),
    where('vehicleInfo.licensePlate', '==', licensePlate),
    limit(2)
  );
  const snapshot = await getDocs(q);
  const match = snapshot.docs.find((d) => d.id !== excludeDriverId);
  return match ? { id: match.id, ...match.data() } : null;
};

export const updateDriverStatus = async (driverId, status) => {
  await updateDoc(doc(db, COLLECTION, driverId), { status, updatedAt: serverTimestamp() });
};

/**
 * Real-time listener for one driver. Returns the `unsubscribe` function,
 * which MUST be called in the useEffect cleanup.
 */
export const subscribeToDriver = (driverId, onChange, onError) =>
  onSnapshot(
    doc(db, COLLECTION, driverId),
    (snap) => onChange(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError
  );

export const removeDriver = async (driverId) => {
  await deleteDoc(doc(db, COLLECTION, driverId));
};

