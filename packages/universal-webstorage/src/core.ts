/**
 * Represents any storage-like interface.
 * Must implement the standard Web Storage API methods.
 */
export type StorageType = {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    key(index: number): string | null;
    readonly length: number;
};

/**
 * Returns the default storage instance if available.
 * In browser environments, this is typically localStorage.
 * If not available (e.g. in Node.js), an error is thrown.
 */
export function getDefaultStorage(): StorageType {
    if (typeof localStorage !== "undefined") {
        return localStorage;
    }
    throw new Error(
        "No default storage available. Please provide a custom storage adapter."
    );
}

/**
 * Retrieves all keys from the specified storage.
 *
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 * @returns An array of keys.
 */
export function getStorageKeys(
    storage: StorageType = getDefaultStorage()
): string[] {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key !== null) {
            keys.push(key);
        }
    }
    return keys;
}

/**
 * Checks whether an item exists in storage.
 *
 * @param key - The key to check.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 * @returns True if the item exists; otherwise, false.
 */
export function hasStorageItem(
    key: string,
    storage: StorageType = getDefaultStorage()
): boolean {
    return storage.getItem(key) !== null;
}

/**
 * Retrieves an item from storage.
 *
 * @param key - The key to retrieve.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 * @returns The stored value as a string, or null if not found.
 */
export function getStorageItem(
    key: string,
    storage: StorageType = getDefaultStorage()
): string | null {
    return storage.getItem(key);
}

/**
 * Stores an item in storage.
 *
 * @param key - The key under which to store the value.
 * @param value - The value to store (as a string).
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function setStorageItem(
    key: string,
    value: string,
    storage: StorageType = getDefaultStorage()
): void {
    storage.setItem(key, value);
}

/**
 * Updates an existing item in storage by applying a callback function
 * to its current value.
 *
 * @param key - The key to update.
 * @param updateFn - A function that receives the current value (or null) and returns the updated value.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function updateStorageItem(
    key: string,
    updateFn: (currentValue: string | null) => string,
    storage: StorageType = getDefaultStorage()
): void {
    const currentValue = storage.getItem(key);
    const updatedValue = updateFn(currentValue);
    storage.setItem(key, updatedValue);
}

/**
 * Removes an item from storage.
 *
 * @param key - The key to remove.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function removeStorageItem(
    key: string,
    storage: StorageType = getDefaultStorage()
): void {
    storage.removeItem(key);
}
