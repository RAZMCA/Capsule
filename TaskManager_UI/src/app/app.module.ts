
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule,Http} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule,Router, Routes } from '@angular/router'
import { FilterPipe } from './pipes/filter.pipe';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { MenuComponent } from './menu/menu.component';
import{ SharedService } from './services/sharedService';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

const routes: Routes = [
    {path: 'add', component: AddComponent},
    {path: 'update', component: UpdateComponent},
    {path: 'view', component: ViewComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    UpdateComponent,
    ViewComponent,
    MenuComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,
    RouterModule.forRoot(routes),
    LoadingBarHttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
