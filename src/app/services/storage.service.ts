import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Keys } from '../constants/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageObj: Storage | null = null;
  private storageInitPromise: Promise<void> | null = null;

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) {
    this.initStorage();
  }

  private initStorage(): void {
    if (!this.storageInitPromise) {
      this.storageInitPromise = this.storage.create().then(storage => {
        this.storageObj = storage;
        this.populateDefaultData();
      }).catch(error => {
        console.error('Failed to initialize storage:', error);
      });
    }
  }

  async populateDefaultData() {
    try {
      let patients = await this.getData(Keys.patients);
      if(patients == null || patients == undefined) {
        this.http.get('assets/json/default-patients.json').subscribe((patients) => {
          this.setData(Keys.patients, patients);
        })
      }
    } catch (error) {
      console.error('Error populating default data', error);
    }
  }

  async setData(key: string, value: any): Promise<void> {
    await this.ensureStorageInitialized();
    if (this.storageObj) {
      try {
        await this.storageObj.set(key, value);
      } catch (error) {
        console.error(`Failed to set data for key '${key}':`, error);
      }
    } else {
      console.error('Storage is not initialized');
    }
  }

  async getData(key: string): Promise<any> {
    await this.ensureStorageInitialized();
    if (this.storageObj) {
      try {
        return await this.storageObj.get(key);
      } catch (error) {
        console.error(`Failed to get data for key '${key}':`, error);
      }
    } else {
      console.error('Storage is not initialized');
    }
    return null;
  }

  private async ensureStorageInitialized(): Promise<void> {
    if (!this.storageObj) {
      await this.storageInitPromise;
    }
  }
}
