import { CampaignService } from './../../services/campaign.service';
import { Campaign } from './../../common/campaign';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertifyjs.service';

@Component({
  selector: 'app-campaign-update',
  templateUrl: './campaign-update.component.html',
  styleUrls: ['./campaign-update.component.css']
})
export class CampaignUpdateComponent implements OnInit{

  theCampaign: Campaign = new Campaign();
  campaignUpdateForm: FormGroup;
  submitted: boolean = false;
  submittedBtn:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private datePipe: DatePipe,
    private alertifyjs:AlertifyService
  ){}

  ngOnInit(): void {
    this.loadCampaign();
    this.campaignUpdateForm=new FormGroup({
      durum:new FormControl("")
    });
  }

  formLoad() {
    this.campaignUpdateForm = new FormGroup({
      durum: new FormControl({value:this.theCampaign.durum, disabled:this.theCampaign.durum=='Mükerrer'},[Validators.required])
    });
  }

  loadCampaign() {
    let id = this.route.snapshot.paramMap.get("id");
    if (id){
      this.campaignService.getCampaign(Number(id)).subscribe({
        next: (response) => {
          this.theCampaign = response;
          this.formLoad();
        },
        error: (err) => {
          console.log(err);
          this.router.navigateByUrl("/");
        }
      });
    } else {
      this.router.navigateByUrl("/");
    }
  }


  get getCampaign(){
    return this.theCampaign;
  }

  onSubmit(){
    this.submitted = true;
    this.submittedBtn=true;
    if(this.campaignUpdateForm.valid){
     this.campaignService.campaignUpdate(this.theCampaign.id, this.campaignUpdateForm.get('durum').value).subscribe({
      next:(response)=>{
          //console.log(response);
          this.alertifyjs.success("Kampanya güncellendi.");
          this.router.navigateByUrl("/");
      },
      error:(err)=>{
        //console.log(err);
        this.alertifyjs.success("Kampanya güncellenirken hata oluştu.");
        this.submittedBtn=false;
      }
     });
    }
  }
}
