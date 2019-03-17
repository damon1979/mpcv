import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthComponent } from './user/auth/auth.component';
import { AddComponent } from './user/add/add.component';
import { UpdateComponent } from './user/update/update.component';
import { ListComponent } from './bouteille/list/list.component';
import { EditComponent } from './bouteille/edit/edit.component';




// déclaration des routes
const appRoutes: Routes = [
    {path: 'list-bouteille', component: ListComponent},
    {path: 'bouteille-add', component: EditComponent},
    {path: '', component: ListComponent}
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
      RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
