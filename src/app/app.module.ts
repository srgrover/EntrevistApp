import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
//import { AngularFireAnalytics } from "@angular/fire/compat/analytics";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Environment
import { environment } from 'src/environments/environment';
import { HeaderModule } from './shared/components/header/header.module';
import { EditProfileDialogModule } from './shared/components/profile/edit/edit-profile-dialog.module';
import { FormModule } from './shared/components/form/form.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // Modules
    HeaderModule,
    EditProfileDialogModule,
    FormModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
