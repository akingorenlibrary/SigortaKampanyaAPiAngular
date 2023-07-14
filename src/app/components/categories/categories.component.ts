import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignCategory } from 'src/app/common/campaign-category';
import { AlertifyService } from 'src/app/services/alertifyjs.service';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categories:CampaignCategory[]=[];
  hasError:boolean=false;
  errorMessage:string;
  pageNumber:number=1;
  pageSize:number=10;
  totalElements:number=0;

  constructor(
    private campaignService:CampaignService,
    private router: Router,
    private alertifyjs: AlertifyService
  ){}

  ngOnInit(): void {
    this.loadCategories();
  }



  loadCategories() {
    this.campaignService.getAllCategoriesPaginated(this.pageNumber-1, this.pageSize).subscribe({
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
      this.categories=data.content;
      this.pageNumber=data.pageable.pageNumber+1;
      this.pageSize=data.pageable.pageSize;
      this.totalElements=data.totalElements;
    };
  }

  pageChange(){
    this.loadCategories();
  }

  deleteCategory(id:number){

    this.alertifyjs.confirm("Uyarı","Silmek istediğinizden emin misiniz?").then(result=>{
      if(result){
        this.campaignService.deleteCategory(id).subscribe({
          next:(response)=>{
            let index=this.categories.findIndex(c=>c.id==id);
            this.categories.splice(index,1);
            this.alertifyjs.success("Kategori silindi.");
          },error:(err)=>{
            this.alertifyjs.error("Hata oluştu.");
          }
        });
      }
    });
  }

}
