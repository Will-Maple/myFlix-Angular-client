import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDescriptionDetailsComponent } from './movie-description-details.component';

describe('MovieDescriptionDetailsComponent', () => {
  let component: MovieDescriptionDetailsComponent;
  let fixture: ComponentFixture<MovieDescriptionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDescriptionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDescriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
