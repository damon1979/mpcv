import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
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

import { CookieService } from 'ngx-cookie-service';
import { CommentairedegustationComponent } from './commentairedegustation/commentairedegustation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTableModule } from '@angular/material/table';
import { AuthGuard } from './services/authguard.service';
import { MatListModule } from '@angular/material/list';
// déclaration des routes
const appRoutes: Routes = [

    { path: 'bouteille-add', component: EditComponent, canActivate: [AuthGuard] },
    {
        path: 'bouteille-add/:id',
        component: EditComponent,
        canActivate: [AuthGuard]
    },
    { path: '', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent }
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
        CommentairedegustationComponent,


    ],
    imports: [
        BrowserModule,


        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatGridListModule,
        MatSelectModule,
        TextFieldModule,
        MatTableModule,
        MatListModule

    ],
    providers: [
        UserService,
        AuthGuard,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
