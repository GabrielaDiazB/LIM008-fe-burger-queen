import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { BreakfastMenuComponent } from './components/breakfast-menu/breakfast-menu.component';
import { OtherMenuComponent } from './components/other-menu/other-menu.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'breakfast-menu', component: BreakfastMenuComponent},
  { path: 'other-menu', component: OtherMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
