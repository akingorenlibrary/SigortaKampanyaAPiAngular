import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Campaign
} from 'src/app/common/campaign';
import {
  AlertifyService
} from 'src/app/services/alertifyjs.service';
import {
  CampaignService
} from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent {

  campaigns: Campaign[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  errorMessage: string = undefined;
  hasError: boolean = false;
  searchMode: boolean = false;
  previousKeyword: string = "";

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute,
    private alertifyjs: AlertifyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((e) => {
      this.listCampaigns();
    })
  }

  listCampaigns() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.handleSearchCampaigns();
    } else {
      this.handleListCampaigns();
    }
  }

  handleSearchCampaigns() {
    const theKeyword: string = this.route.snapshot.paramMap.get("keyword");
    if (this.previousKeyword != theKeyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    this.campaignService.searchCampaign(
      theKeyword,
      this.pageNumber - 1,
      this.pageSize
    ).subscribe(this.proccessResult());
  }

  handleListCampaigns() {
    this.campaignService.getAllCampanign(this.pageNumber - 1, this.pageSize).subscribe({
      next: (this.proccessResult()),
      error: (err) => {
        this.hasError = true;
        this.errorMessage = "Hata oluştu.";
      }
    });
  }

  proccessResult() {
    return (data: any) => {
      this.hasError = false;
      this.campaigns = [];
      this.campaigns = data.content;
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    }
  }

  sizeChange(value: string) {
    this.pageSize = Number(value);
    this.pageNumber = 1;
    this.listCampaigns();
  }


  deleteCampaign(id: number) {

    this.alertifyjs.confirm("Uyarı", "Silmek istediğinizden emin misiniz?").then(result => {
      if (result) {
        this.campaignService.deleteCampaign(id).subscribe({
          next: (response) => {
            let index = this.campaigns.findIndex(c => c.id == id);
            this.campaigns.splice(index, 1);
            this.alertifyjs.success("Kampanya silindi.");
          },
          error: (err) => {
            this.alertifyjs.error("Kampanya silinemedi.");
          }
        });
      }
    });
  }
}
