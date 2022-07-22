import { UpdateInfo } from './../models/updateInfo';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from '@angular/fire/auth';
import { LoginData } from '../models/LoginData';
import { RegisterData } from '../models/RegisterData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//Administración -------------------
  public debug: boolean = false;
//----------------------------------

  //public user: User | null;
  public user$: Subject<User | null>;

  constructor(public auth: Auth) {
    this.user$ = new Subject();

    //this.user = this.auth.currentUser;
  }

  login({email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then(() => this.user$.next(this.getCurrentUser()));
  }

  async register({nombre, email, password }: RegisterData): Promise<void>{
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await updateProfile(
      credential.user, { displayName: nombre }
    );

    await sendEmailVerification(credential.user);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .then(() => this.user$.next(this.getCurrentUser()));
  }

  logout() {
    return signOut(this.auth)
    .then(() => this.user$.next(this.getCurrentUser()));
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }


  isLoggedIn(){
    return this.getCurrentUser() != null;
  }

  async updateCurrentUser({displayName, photoURL}: UpdateInfo){
    var user = this.getCurrentUser();

    if(user)
      return await updateProfile(
        user, { displayName: displayName, photoURL: photoURL }
      ).catch((e) => {
        console.error(e.message)
      });
  }

  async resetPassword(email: string): Promise<any> {
    // sends reset password email
    var y = await sendPasswordResetEmail(this.auth, email);
    if(this.debug)console.log("🚀 ~ file: auth.service.ts ~ line 74 ~ AuthService ~ resetPassword ~ y", y)
  }

  async sendEmailVerification(user: User){
    await sendEmailVerification(user);
  }
}
