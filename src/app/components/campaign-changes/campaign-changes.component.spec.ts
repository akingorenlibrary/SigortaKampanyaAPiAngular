import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignChangesComponent } from './campaign-changes.component';

describe('CampaignChangesComponent', () => {
  let component: CampaignChangesComponent;
  let fixture: ComponentFixture<CampaignChangesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignChangesComponent]
    });
    fixture = TestBed.createComponent(CampaignChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
