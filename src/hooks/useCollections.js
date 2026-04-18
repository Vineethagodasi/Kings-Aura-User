import { useEffect, useState } from "react";
import { getAllCollections } from "../constants/collection";


export const useCollections = (limit = null) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await getAllCollections();
        if (res.data.success) {
          const data = res.data.data;
          setCollections(limit ? data.slice(0, limit) : data);
        }
      } catch (error) {
        console.error("Failed to fetch collections", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [limit]);

  return { collections, loading };
};