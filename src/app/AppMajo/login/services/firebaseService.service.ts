import { Injectable } from '@angular/core';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../../main';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class FirebaseAuthService {
  
    constructor() {}
  
    // Login con Google
    async loginWithGoogle(): Promise<any> {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
      } catch (error) {
        throw error;
      }
    }
  
    // Logout
    async logout(): Promise<void> {
      await signOut(auth);
    }
  
    // Obtener usuario actual
    getCurrentUser(): Observable<User | null> {
      return from(new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user);
        });
      }));
    }
  }