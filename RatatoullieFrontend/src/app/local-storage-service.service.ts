import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { UserSession } from './model/users/user-session';

// key that is used to access the data in local storage
const STORAGE_KEY = 'local_user';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageServiceService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  public storeUserOnLocalStorage(userSession: UserSession){
    this.storage.set(STORAGE_KEY, userSession);
  }

  public getUserFromLocalStorage(): UserSession {
    return this.storage.get(STORAGE_KEY) || null;
  }

  public removeUserFromLocalStorage() {
    this.storage.remove(STORAGE_KEY)
  }

}

//https://medium.com/@tiagovalverde/how-to-save-your-app-state-in-localstorage-with-angular-ce3f49362e31