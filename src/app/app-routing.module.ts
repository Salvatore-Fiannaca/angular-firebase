import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from "./auth/auth.guard";

// Component
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TranscriptionComponent } from './pages/contents/transcription/transcription.component';
import { ArrangmentComponent } from './pages/contents/arrangment/arrangment.component';
import { CompositionComponent } from './pages/contents/composition/composition.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '',              component: HomepageComponent },
    { path: 'trascrizioni',  component: TranscriptionComponent },
    { path: 'arrangiamenti', component: ArrangmentComponent },
    { path: 'composizioni',  component: CompositionComponent },
    { path: 'contatti',      component: ContactsComponent },
    { path: 'login',         component: SignInComponent },
    { 
    path: 'dashboard',      
    component: DashboardComponent, 
    canActivate: [AuthGuard],
    },
    {
    path: '**',             component: PageNotFoundComponent 
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

