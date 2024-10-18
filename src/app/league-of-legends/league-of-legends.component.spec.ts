import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueOfLegendsComponent } from './league-of-legends.component';

describe('LeagueOfLegendsComponent', () => {
  let component: LeagueOfLegendsComponent;
  let fixture: ComponentFixture<LeagueOfLegendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueOfLegendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueOfLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
