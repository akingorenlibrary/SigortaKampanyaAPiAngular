import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchText:string="";
  searchMode:boolean=false;

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.searchMode=this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode){
      this.searchText=this.route.snapshot.paramMap.get("keyword");
    }
  }

  searchCampaign(){
    if(this.searchText != null && this.searchText != undefined && this.searchText!="" && this.searchText.trim().length!=0){
      this.router.navigateByUrl(`/campaign/search/${this.searchText}`);
    }
  }

  searchCampaignClear(){
    this.router.navigateByUrl("/campaigns");
  }

}
