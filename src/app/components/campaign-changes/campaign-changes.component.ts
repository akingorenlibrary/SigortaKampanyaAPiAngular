import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/common/campaign';
import { CampaignChange } from 'src/app/common/campaign-change';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaign-changes',
  templateUrl: './campaign-changes.component.html',
  styleUrls: ['./campaign-changes.component.css']
})
export class CampaignChangesComponent implements OnInit{

  campaignList:CampaignChange[]=[];
  pageNumber:number=1;
  pageSize:number=10;
  totalElements:number=0;
  hasError:boolean=false;
  errorMessage:string;

  constructor(
    private campaignService:CampaignService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((e)=>{
      this.loadCampaignChanges();
    })

  }

  loadCampaignChanges() {
    let id=this.route.snapshot.paramMap.get("id");
    this.campaignService.getCampaignChanges(this.pageNumber-1, this.pageSize, Number(id)).subscribe({
      next:(this.proccessResult()),
      error:(err)=>{
        console.log(err);
        this.hasError=true;
        this.errorMessage="Hata oluştu.";
      }
    });
  }

  proccessResult(){
    return (data:any)=>{
      this.hasError=false;
      this.campaignList=data.content;
      this.pageNumber=data.pageable.pageNumber+1;
      this.pageSize=data.pageable.pageSize;
      this.totalElements=data.totalElements;
    };
  }

  pageChange(){
    this.loadCampaignChanges();
  }
}
