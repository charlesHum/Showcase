import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CmComponent } from './cm/cm.component';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'swingLeft'}},
  {path: 'contact', component: ContactComponent, data: {animation: 'swingRight'}},
  {path: 'cm', component: CmComponent, data: {animation: 'swingRight'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
