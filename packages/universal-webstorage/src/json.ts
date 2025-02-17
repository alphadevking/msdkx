import {
    setStorageItem,
    getStorageItem,
    updateStorageItem,
    StorageType,
    getDefaultStorage,
} from "./core";

/**
 * Stores a JSON-serializable value in storage.
 *
 * @param key - The key under which to store the value.
 * @param value - The value to store (will be JSON-stringified).
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function setJSONItem<T>(
    key: string,
    value: T,
    storage: StorageType = getDefaultStorage()
): void {
    setStorageItem(key, JSON.stringify(value), storage);
}

/**
 * Retrieves a JSON-parsed value from storage.
 *
 * @param key - The key to retrieve.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 * @returns The parsed value or null if not found or if parsing fails.
 */
export function getJSONItem<T>(
    key: string,
    storage: StorageType = getDefaultStorage()
): T | null {
    const item = getStorageItem(key, storage);
    if (item === null) return null;
    try {
        return JSON.parse(item) as T;
    } catch (error) {
        console.error(`Error parsing JSON from storage key "${key}":`, error);
        return null;
    }
}

/**
 * Updates a JSON-stored value by applying a callback function.
 *
 * @param key - The key to update.
 * @param updateFn - A function that receives the current value (or null) and returns the new value.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function updateJSONItem<T>(
    key: string,
    updateFn: (currentValue: T | null) => T,
    storage: StorageType = getDefaultStorage()
): void {
    const currentValue = getJSONItem<T>(key, storage);
    const updatedValue = updateFn(currentValue);
    setJSONItem(key, updatedValue, storage);
}
