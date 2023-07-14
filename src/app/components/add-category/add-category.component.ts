import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertifyjs.service';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  addCategory:FormGroup;
  submitted:boolean=false;
  hasError:boolean=false;
  errorMessage:string;

  constructor(
    private campaignService:CampaignService,
    private router: Router,
    private alertifyjs: AlertifyService

  ){}

  ngOnInit(): void {
    this.addCategory=new FormGroup({
      kategoriAdi:new FormControl("",Validators.required)
    });
  }

  onSubmit(){
   this.submitted=true;
   if(this.addCategory.valid){

    this.addCategory.markAllAsTouched();
    this.campaignService.saveCategory(this.addCategory.value.kategoriAdi).subscribe({
      next:(response)=>{
        //console.log("response: ",response);
        this.hasError=false;
        this.alertifyjs.success("Kategori kaydedildi.");
        this.addCategory.reset();
        this.submitted=false;
      },
      error:(err)=>{
        //console.log("err: ",err);
        this.hasError=true;
        this.errorMessage = err != null && err.error != null && err.error.errors != null ? err.error.errors : "Hata oluştu.";
        this.addCategory.get('kategoriAdi')?.setErrors({ 'invalid': true });
      }
    });
   }
  }

}
