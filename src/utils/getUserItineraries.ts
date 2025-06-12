
import { database } from "@/services/firebaseConfig";
import { ref, get, child } from "firebase/database";

export const getUserItineraries = async (userId: string) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `itineraries/${userId}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convierte el objeto a array con las claves
      return Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    return [];
  }
};
