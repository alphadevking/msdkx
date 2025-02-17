import {
    setStorageItem,
    getStorageItem,
    removeStorageItem,
    StorageType,
    getDefaultStorage,
} from "./core";

interface TTLStoredValue {
    value: string;
    expires: number; // Timestamp in milliseconds
}

/**
 * Stores an item in storage with a time-to-live (TTL).
 *
 * @param key - The key under which to store the value.
 * @param value - The value to store.
 * @param ttl - Time-to-live in milliseconds.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function setStorageItemWithTTL(
    key: string,
    value: string,
    ttl: number,
    storage: StorageType = getDefaultStorage()
): void {
    const ttlValue: TTLStoredValue = { value, expires: Date.now() + ttl };
    setStorageItem(key, JSON.stringify(ttlValue), storage);
}

/**
 * Retrieves an item stored with TTL. If the item has expired, it is removed and null is returned.
 *
 * @param key - The key to retrieve.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 * @returns The stored value or null if expired or not found.
 */
export function getStorageItemWithTTL(
    key: string,
    storage: StorageType = getDefaultStorage()
): string | null {
    const item = getStorageItem(key, storage);
    if (!item) return null;
    try {
        const parsed: TTLStoredValue = JSON.parse(item);
        if (Date.now() > parsed.expires) {
            removeStorageItem(key, storage);
            return null;
        }
        return parsed.value;
    } catch (error) {
        console.error(`Error parsing TTL value for key "${key}":`, error);
        return null;
    }
}
