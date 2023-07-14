import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CampaignUpdateComponent } from './components/campaign-update/campaign-update.component';
import { CampaignChangesComponent } from './components/campaign-changes/campaign-changes.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const routes: Routes = [
  {path:"",component:LayoutsComponent,children:[
    {path:"",redirectTo:"/campaigns", pathMatch:"full"},
    {path:"campaigns",component:CampaignsComponent},
    {path:"campaign/update/:id",component:CampaignUpdateComponent},
    {path:"campaign/changes/:id", component:CampaignChangesComponent},
    {path:"campaign/add", component:AddCampaignComponent},
    {path:"categories", component:CategoriesComponent},
    {path:"categories/add", component:AddCategoryComponent},
    {path:"statistics", component:StatisticsComponent},
    {path:"campaign/search/:keyword",component:CampaignsComponent}
  ]},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
