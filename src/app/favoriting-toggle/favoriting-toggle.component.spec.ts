import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritingToggleComponent } from './favoriting-toggle.component';

describe('FavoritingToggleComponent', () => {
  let component: FavoritingToggleComponent;
  let fixture: ComponentFixture<FavoritingToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritingToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritingToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
