import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { YouTubePlayerModule } from "@angular/youtube-player";


// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';

// COMPONENT
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CompositionComponent } from './pages/contents/composition/composition.component';
import { ArrangmentComponent } from './pages/contents/arrangment/arrangment.component';
import { TranscriptionComponent } from './pages/contents/transcription/transcription.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    ContactsComponent,
    PageNotFoundComponent,
    CompositionComponent,
    ArrangmentComponent,
    TranscriptionComponent,
    DashboardComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    YouTubePlayerModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
