import type { CookieSettings } from '~~/layers/tagging/models/cookie-settings.model';
import { assertIsObject } from '@unicornify/utils';

const storage =
  typeof localStorage !== 'undefined'
    ? localStorage
    : {
        items: {} as Record<string, string>,
        getItem(key: string) {
          return this.items[key];
        },
        setItem(key: string, value: string) {
          return (this.items[key] = value);
        },
      };

export const localStorageService = {
  get<Key extends keyof LocalStorageRegistry>(key: Key): LocalStorageRegistry[Key] | null {
    const serializedItem = storage.getItem(key);
    const item = serializedItem
      ? (JSON.parse(serializedItem) as StorageItem<LocalStorageRegistry[Key]>)
      : { data: null };
    return item.data;
  },
  save<Key extends keyof LocalStorageRegistry>(key: Key, value: LocalStorageRegistry[Key]): void {
    const item: StorageItem<LocalStorageRegistry[Key]> = {
      data: value,
      createdAt: Date.now(),
    };
    storage.setItem(key, JSON.stringify(item));
  },
  push<Key extends ExtractKeysOfType<LocalStorageRegistry, unknown[]>>(
    key: Key,
    value: LocalStorageRegistry[Key][number],
  ): void {
    const collection: LocalStorageRegistry[Key] = this.get(key) ?? [];
    collection.push(value);
    this.save(key, collection);
  },
  set<Key extends ExtractKeysOfType<LocalStorageRegistry, Record<string, unknown>>>(
    key: Key,
    recordKey: string,
    value: LocalStorageRegistry[Key][keyof LocalStorageRegistry[Key]],
  ): void {
    const record: Record<string, unknown> = this.get(key) ?? {};
    assertIsObject(record);
    record[recordKey] = value;
    this.save(key, record as LocalStorageRegistry[Key]);
  },
  deleteSingle<Key extends keyof LocalStorageRegistry>(key: Key, recordKey: string) {
    const record = this.get(key) ?? {};
    assertIsObject(record);
    const item = record[recordKey];
    delete record[recordKey];
    this.save(key, record as LocalStorageRegistry[Key]);
    return item;
  },
};

type LocalStorageRegistry = {
  cookieSettings: CookieSettings;
  hasInteractedWithCookiesBanner: boolean;
  isSignedIn: boolean;
  data: string[];
};

type StorageItem<Something> = {
  data: Something;
  createdAt: number;
};

type ExtractKeysOfType<RecordType, ValueType> = keyof {
  [Key in keyof RecordType as RecordType[Key] extends ValueType ? Key : never]: ValueType;
};
