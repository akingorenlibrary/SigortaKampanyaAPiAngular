import { Component, OnInit } from '@angular/core';
import { CampaignStatistics } from 'src/app/common/campaign-statistic';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  statistics:CampaignStatistics[]=[];
  hasError:boolean=false;
  errorMessage:string;

  constructor(
    private campaignService:CampaignService
  ){}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics() {
    this.campaignService.getCampaignStatistics().subscribe({
      next:(response)=>{
        //console.log(response);
        this.hasError=false;
        this.statistics=response;
      },
      error:(err)=>{
        //console.log(err);
        this.hasError=true;
        this.errorMessage="Hata oluştu."
      }
    });
  }
}
