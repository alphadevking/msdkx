
# universal-webstorage

**universal-webstorage** is a lightweight, universal utility for managing web storage based on the [MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) specification. It provides a consistent API for core storage operations, bulk actions, JSON handling, and TTL (time-to-live) support. The library works with `localStorage`, `sessionStorage`, or any custom storage-like interface.

> **Note:** For React-specific hooks and functionality, please see the separate [`universal-webstorage-react`](https://github.com/your-repo/universal-webstorage-react) package.

## Features

- **Core Storage Operations**: Get, set, update, and remove individual keys.
- **Bulk Operations**: Filter, update, and remove multiple keys based on a predicate.
- **JSON Support**: Automatically stringify/parse JSON values for seamless object storage.
- **TTL (Time-To-Live) Support**: Store items with an expiration time.
- **Universal**: Works with `localStorage`, `sessionStorage`, or any storage-like interface.

## Installation

Install via npm:

```bash
npm install universal-webstorage
```

Or via yarn:

```bash
yarn add universal-webstorage
```

## Usage

### Importing the Library

You can import individual functions or use the main entry point to access all utilities.

```ts
// Import specific functions:
import { setStorageItem, getStorageItem } from 'universal-webstorage';

// Or import the entire module:
import * as webstorage from 'universal-webstorage';
```

### Basic Operations

#### Store a Key-Value Pair

```ts
import { setStorageItem } from 'universal-webstorage';

setStorageItem("userToken", "abc123");
```

#### Retrieve a Stored Item

```ts
import { getStorageItem } from 'universal-webstorage';

const token = getStorageItem("userToken");
console.log(token); // Output: "abc123"
```

#### Update a Stored Item

```ts
import { updateStorageItem } from 'universal-webstorage';

updateStorageItem("userToken", (current) =>
  current ? current + "_v2" : "defaultToken"
);
```

#### Remove a Stored Item

```ts
import { removeStorageItem } from 'universal-webstorage';

removeStorageItem("userToken");
```

### Bulk Operations

#### Retrieve Multiple Items

For example, retrieve all keys that start with `"app:"`:

```ts
import { getStorageItems } from 'universal-webstorage';

const appItems = getStorageItems((key) => key.startsWith("app:"));
console.log(appItems);
```

#### Update Multiple Items

```ts
import { updateStorageItems } from 'universal-webstorage';

updateStorageItems(
  (key) => key.startsWith("app:"),
  (current) => (current ? current.toUpperCase() : "")
);
```

#### Remove Multiple Items

```ts
import { removeStorageKeys } from 'universal-webstorage';

removeStorageKeys((key) => key.includes("temp"));
```

### JSON Operations

#### Store a JSON Value

```ts
import { setJSONItem } from 'universal-webstorage';

setJSONItem("userData", { name: "Alice", age: 30 });
```

#### Retrieve a JSON Value

```ts
import { getJSONItem } from 'universal-webstorage';

const userData = getJSONItem<{ name: string; age: number }>("userData");
console.log(userData);
```

#### Update a JSON Value

```ts
import { updateJSONItem } from 'universal-webstorage';

updateJSONItem<{ name: string; age: number }>("userData", (current) => ({
  ...current,
  age: (current?.age || 0) + 1,
}));
```

### TTL (Time-To-Live) Operations

#### Store an Item with TTL

Store an item that expires in 1 hour:

```ts
import { setStorageItemWithTTL } from 'universal-webstorage';

setStorageItemWithTTL("sessionData", "sessionValue", 3600 * 1000);
```

#### Retrieve an Item with TTL

```ts
import { getStorageItemWithTTL } from 'universal-webstorage';

const sessionValue = getStorageItemWithTTL("sessionData");
console.log(sessionValue);
```

## MDN Reference

This library follows the [MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) specification. For detailed information on how the Web Storage API works, refer to the MDN documentation.

## API Reference

For detailed API documentation, please refer to the [documentation website](#universal-webstorage) or review the source code in the repository.

## Contributing

Contributions, issues, and feature requests are welcome! Please check the [issues page](https://github.com/alphadevking/msdkx/packages/universal-webstorage/issues) if you want to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy using **universal-webstorage** for all your web storage needs! If you have any questions or need further assistance, feel free to reach out.
