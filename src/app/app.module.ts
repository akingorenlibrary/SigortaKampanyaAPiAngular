import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CampaignUpdateComponent } from './components/campaign-update/campaign-update.component';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertifyjs.service';
import { CampaignChangesComponent } from './components/campaign-changes/campaign-changes.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { SearchComponent } from './components/search/search.component';


registerLocaleData(localeTr);

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    NavbarComponent,
    NotFoundComponent,
    CampaignUpdateComponent,
    CampaignChangesComponent,
    StatisticsComponent,
    CampaignsComponent,
    AddCampaignComponent,
    CategoriesComponent,
    AddCategoryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [DatePipe, AlertifyService,{ provide: LOCALE_ID, useValue: 'tr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
