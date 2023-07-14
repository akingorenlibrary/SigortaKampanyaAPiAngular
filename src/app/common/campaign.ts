import { CampaignCategory } from "./campaign-category";

export class Campaign {
  public id:number;
  public ilanBasligi:string;
  public detayAciklamasi:string;
  public durum:string;
  public olusturulmaTarihi:Date;
  public sonGuncellenmeTarihi:Date;
  public kampanyaKategori:CampaignCategory;
}
