import {
    getStorageKeys,
    updateStorageItem,
    removeStorageItem,
    StorageType,
    getDefaultStorage,
} from "./core";

/**
 * Filters the keys in storage using a predicate function.
 *
 * @param predicate - A function that returns true for keys that should be included.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 * @returns An array of keys that satisfy the predicate.
 */
export function filterStorageKeys(
    predicate: (key: string) => boolean,
    storage: StorageType = getDefaultStorage()
): string[] {
    return getStorageKeys(storage).filter(predicate);
}

/**
 * Retrieves key-value pairs for all keys in storage that satisfy the predicate.
 *
 * @param predicate - A function that returns true for keys to be retrieved.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 * @returns An object containing key-value pairs.
 */
export function getStorageItems(
    predicate: (key: string) => boolean,
    storage: StorageType = getDefaultStorage()
): { [key: string]: string; } {
    return getStorageKeys(storage).reduce((acc, key) => {
        if (predicate(key)) {
            const value = storage.getItem(key);
            if (value !== null) {
                acc[key] = value;
            }
        }
        return acc;
    }, {} as { [key: string]: string; });
}

/**
 * Removes all keys from storage that satisfy the predicate.
 *
 * @param predicate - A function that returns true for keys to be removed.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function removeStorageKeys(
    predicate: (key: string) => boolean,
    storage: StorageType = getDefaultStorage()
): void {
    filterStorageKeys(predicate, storage).forEach((key) =>
        removeStorageItem(key, storage)
    );
}

/**
 * Updates all items in storage whose keys satisfy the predicate.
 *
 * @param predicate - A function that returns true for keys to be updated.
 * @param updateFn - A callback that receives the current value and returns the updated value.
 * @param storage - The storage instance (defaults to getDefaultStorage()).
 */
export function updateStorageItems(
    predicate: (key: string) => boolean,
    updateFn: (currentValue: string | null) => string,
    storage: StorageType = getDefaultStorage()
): void {
    getStorageKeys(storage).forEach((key) => {
        if (predicate(key)) {
            updateStorageItem(key, updateFn, storage);
        }
    });
}
