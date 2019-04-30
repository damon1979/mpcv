import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import  { AngularFireModule }  from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthComponent } from './user/auth/auth.component';
import { AddComponent } from './user/add/add.component';
import { UpdateComponent } from './user/update/update.component';
import { ListComponent } from './bouteille/list/list.component';
import { EditComponent } from './bouteille/edit/edit.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth-guard.service';

// déclaration des routes
const appRoutes: Routes = [
    {path: 'list-bouteille', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'bouteille-add', component: EditComponent, canActivate: [AuthGuard]},
    {path: '', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'login', component: AuthComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthComponent,
    AddComponent,
    UpdateComponent,
    ListComponent,
    EditComponent,


  ],
  imports: [
      BrowserModule,
      NgbModule,

           AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      ReactiveFormsModule, 
      RouterModule.forRoot(appRoutes)
  ],
    providers: [
	UserService,
	AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
