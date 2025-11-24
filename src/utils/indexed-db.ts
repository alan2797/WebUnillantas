// utils/indexedDB.ts
export class IndexedDBManager {
  private dbName: string;
  private version: number;

  constructor(dbName: string, version: number = 1) {
    this.dbName = dbName;
    this.version = version;
  }

    // Obtener todos los datos de un store
  async getAll<T>(storeName: string): Promise<{id: string, data: T}[]> {
    const db = await this.openDB(storeName);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      transaction.oncomplete = () => db.close();
    });
  }

  // Abrir/Crear base de datos
  async openDB(storeName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Crear object store si no existe
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      };
    });
  }

  // Guardar datos
  async set<T>(storeName: string, key: string, data: T): Promise<void> {
    const db = await this.openDB(storeName);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put({ id: key, data, timestamp: new Date() });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
      
      transaction.oncomplete = () => db.close();
    });
  }

  // Obtener datos
  async get<T>(storeName: string, key: string): Promise<T | null> {
    const db = await this.openDB(storeName);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.data : null);
      };
      
      transaction.oncomplete = () => db.close();
    });
  }

  // Eliminar datos
  async delete(storeName: string, key: string): Promise<void> {
    const db = await this.openDB(storeName);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
      
      transaction.oncomplete = () => db.close();
    });
  }

  async deleteDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase("fudem");

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
      req.onblocked = () => {
        console.warn("Database deletion blocked");
      };
    });
  }
  
}

// Instancia global
export const idbManager = new IndexedDBManager('Fudem');