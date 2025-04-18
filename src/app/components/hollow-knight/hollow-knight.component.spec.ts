import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HollowKnightComponent } from './hollow-knight.component';

describe('HollowKnightComponent', () => {
  let component: HollowKnightComponent;
  let fixture: ComponentFixture<HollowKnightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HollowKnightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HollowKnightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
