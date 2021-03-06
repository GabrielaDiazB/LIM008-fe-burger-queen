import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FirestoreService } from './services/firestore/firestore.service';
import { OrderService } from './services/order/order.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { BreakfastMenuComponent } from './components/breakfast-menu/breakfast-menu.component';
import { OtherMenuComponent } from './components/other-menu/other-menu.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    BreakfastMenuComponent,
    OtherMenuComponent,
    MainContainerComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [
    FirestoreService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
