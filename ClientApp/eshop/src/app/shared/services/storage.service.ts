import { Injectable, Inject, InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken('LOCAL_STORAGE');

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private readonly storage: Storage
  ) { }

  set(key: string, data: any) {
    if (data !== undefined) {
      this.storage.setItem(key, data);
    }
  }

  get<T>(key: string) {
    const result = this.storage.getItem(key);
    try {
      return JSON.parse(result) as T;
    } catch (e) {
      return this.storage.getItem(key);
    }
  }

  clear() {
    this.storage.clear();
  }
}
