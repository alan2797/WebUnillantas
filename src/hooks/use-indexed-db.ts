// hooks/useIndexedDB.ts
import { useState, useEffect, useCallback } from 'react';
import { idbManager } from '../utils/indexed-db';

export function useIndexedDB<T>(
  storeName: string, 
  key: string, 
  initialValue: T
) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const savedData = await idbManager.get<T>(storeName, key);
        
        if (savedData !== null) {
          setData(savedData);
        }
        setError(null);
      } catch (err) {
        setError(`Error loading data: ${err}`);
        console.error('Error loading from IndexedDB:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [storeName, key]);

  // Función para guardar datos
  const saveData = useCallback(async (newData: T) => {
    try {
      setLoading(true);
      await idbManager.set(storeName, key, newData);
      setData(newData);
      setError(null);
    } catch (err) {
      setError(`Error saving data: ${err}`);
      console.error('Error saving to IndexedDB:', err);
    } finally {
      setLoading(false);
    }
  }, [storeName, key]);

  // Función para actualizar parcialmente
  const updateData = useCallback(async (updates: Partial<T>) => {
    const newData = { ...data, ...updates };
    await saveData(newData);
  }, [data, saveData]);

  const resetStore = useCallback(async () => {
    try {
      setLoading(true);
      await idbManager.set(storeName, key, initialValue);
      setData(initialValue);
      setError(null);
    } catch (err) {
      setError(`Error resetting data: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [storeName, key, initialValue]);

  const resetAllIndexedDB = useCallback(async () => {
    try {
      console.log("reseteando bd")
      setLoading(true);

      await new Promise((resolve, reject) => {
        const req = indexedDB.deleteDatabase("Fudem");

      console.log("reseteando b 2d")
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
        req.onblocked = () => {
          console.warn("IndexedDB deletion blocked");
        };
      });

      // Reset del estado del hook
      setData(initialValue);

      setError(null);
    } catch (err) {
      setError(`Error resetting IndexedDB: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [initialValue]);
  
  return { 
    data, 
    saveData, 
    updateData, 
    resetStore, 
    resetAllIndexedDB,
    loading, 
    error 
  };
}