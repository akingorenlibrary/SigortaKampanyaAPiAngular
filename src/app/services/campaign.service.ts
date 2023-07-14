import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Campaign } from '../common/campaign';
import { CampaignChange } from '../common/campaign-change';
import { CampaignStatistics } from '../common/campaign-statistic';
import { CampaignCategory } from '../common/campaign-category';
import { CampaignSave } from '../common/campaign-save';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private baseUrl=environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  getAllCampanign(pageNumber:number, pageSize:number):Observable<GetResponseCampaigns>{
    let searchUrl=`${this.baseUrl}/kampanyalar?page=${pageNumber}&size=${pageSize}`;
    return this.http.get<GetResponseCampaigns>(searchUrl);
  }

  getCampaign(id:number):Observable<Campaign>{
    let searchUrl=`${this.baseUrl}/kampanyalar/${id}`;
    return this.http.get<Campaign>(searchUrl);
  }

  campaignUpdate(gelenIid:number, gelenDurum:string):Observable<any>{
    let searchUrl=`${this.baseUrl}/kampanyalar`;
    let data={id:gelenIid, durum:gelenDurum};
    //console.log(data);
    return this.http.put<any>(searchUrl,data);
  }

  getCampaignChanges(pageNumber:number, pageSize:number, id:number):Observable<GetResponseCampaignsChanges>{
    let searchUrl=`${this.baseUrl}/kampanyalar/degisiklikler/${id}?page=${pageNumber}&size=${pageSize}`;
    return this.http.get<GetResponseCampaignsChanges>(searchUrl);
  }

  getCampaignStatistics():Observable<CampaignStatistics[]>{
    let searchUrl=`${this.baseUrl}/kampanyalar/istatistikler`;
    return this.http.get<CampaignStatistics[]>(searchUrl);
  }

  getAllCategories():Observable<CampaignCategory[]>{
    let searchUrl=`${this.baseUrl}/kategoriler`;
    return this.http.get<CampaignCategory[]>(searchUrl);
  }

  saveCampaign(campaign:CampaignSave):Observable<any>{
    let searchUrl=`${this.baseUrl}/kampanyalar`;
    return this.http.post<any>(searchUrl,campaign);
  }

  saveCategory(categoryName:string):Observable<any>{
    let searchUrl=`${this.baseUrl}/kategoriler`;
    let data={
      kategoriAdi:categoryName
    }
    return this.http.post<any>(searchUrl,data);
  }

  getAllCategoriesPaginated(pageNumber:number, pageSize:number):Observable<GetResponseCampaignCategories>{
    let searchUrl=`${this.baseUrl}/kategoriler/sayfalandirilmis?page=${pageNumber}&size=${pageSize}`;
    return this.http.get<GetResponseCampaignCategories>(searchUrl);
  }

  deleteCategory(id:number):Observable<any>{
    let searchUrl=`${this.baseUrl}/kategoriler/${id}`;
    return this.http.delete<any>(searchUrl);
  }

  searchCampaign(searchText:string, pageNumber:number, pageSize:number):Observable<GetResponseCampaigns>{
    let searchUrl=`${this.baseUrl}/kampanyalar/search?q=${searchText}&page=${pageNumber}&size=${pageSize}`;
    return this.http.get<GetResponseCampaigns>(searchUrl);
  }

  deleteCampaign(id:number):Observable<any>{
    let searchUrl=`${this.baseUrl}/kampanyalar/${id}`;
    return this.http.delete<any>(searchUrl);
  }
}

interface GetResponseCampaigns{
  content:Campaign[],
  pageable:{
    pageNumber:number,
    pageSize:number,
  },
  totalElements:number,
  totalPages:number
}

interface GetResponseCampaignCategories{
  content:CampaignCategory[],
  pageable:{
    pageNumber:number,
    pageSize:number,
  },
  totalElements:number,
  totalPages:number
}

interface GetResponseCampaignsChanges{
  content:CampaignChange[],
  pageable:{
    pageNumber:number,
    pageSize:number,
  },
  totalElements:number,
  totalPages:number
}
