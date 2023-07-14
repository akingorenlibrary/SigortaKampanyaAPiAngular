import {CampaignService} from 'src/app/services/campaign.service';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  CampaignCategory
} from 'src/app/common/campaign-category';
import {
  Router
} from '@angular/router';
import {
  AlertifyService
} from 'src/app/services/alertifyjs.service';
import { CampaignSave } from 'src/app/common/campaign-save';


@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  addFrom: FormGroup;
  submitted: boolean = false;
  categories: CampaignCategory[] = [];
  isPageDisable: boolean = false;
  hasError: boolean = false;
  errorMessage: string;
  @ViewChild("kategorySelect", { static: true }) kategorySelect: ElementRef;

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private alertifyjs: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.formLoad();
  }

  formLoad(){
    this.addFrom = new FormGroup({
      ilanBasligi: new FormControl("", [Validators.required, Validators.pattern(/^[\wÇçĞğİıÖöŞşÜü]+.*$/), Validators.minLength(10), Validators.maxLength(50)]),
      detayAciklamasi: new FormControl("", [Validators.required, Validators.minLength(20), Validators.maxLength(200)]),
      kategori: new FormControl("", Validators.required),
    });
  }

  getCategories() {
    this.campaignService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;

        if (response.length == 0) {
          this.isPageDisable = true;
          this.hasError = true;
          this.formDisable();
          this.errorMessage = "Herhangi bir kategori eklemeden kampanya ekleyemezsiniz."
        } else {
          this.formEnable();
          this.isPageDisable = false;
          this.hasError = false;
        }

      },
      error: (err) => {
        //console.log(err);
        this.formDisable();
        this.errorMessage = "Hata oluştu.";
        this.hasError = true;
        this.isPageDisable = true;
      }
    });
  }


  formDisable(){
    this.addFrom.get("ilanBasligi").disable();
    this.addFrom.get("detayAciklamasi").disable();
    this.addFrom.get("kategori").disable();
  }

  formEnable(){
    this.addFrom.get("ilanBasligi").enable();
    this.addFrom.get("detayAciklamasi").enable();
    this.addFrom.get("kategori").enable();
  }

  onSubmit() {
    this.submitted = true;
    if(this.addFrom.valid){
      this.addFrom.markAllAsTouched();


      let categoryName=this.categories.find(c=>c.id==this.addFrom.value.kategori);

      let kategori:CampaignCategory={
        id:this.addFrom.value.kategori,
        kategoriAdi:categoryName ? categoryName.kategoriAdi : ''
      }

      const campaign:CampaignSave={
        ilanBasligi:this.addFrom.value.ilanBasligi,
        detayAciklamasi:this.addFrom.value.detayAciklamasi,
        kampanyaKategori:kategori
      }


      this.campaignService.saveCampaign(campaign).subscribe({
        next:(response)=>{
          this.hasError=false;
          this.alertifyjs.success("Kampanya kaydedildi.");
          this.addFrom.reset();
          this.submitted=false;
        },
        error:(err)=>{
          //console.log(err);
          this.hasError=true;
          this.errorMessage="Hata oluştu.";
        }
      })

    }
  }

}
