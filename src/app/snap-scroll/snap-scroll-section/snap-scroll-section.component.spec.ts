import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapScrollSectionComponent } from './snap-scroll-section.component';

describe('SnapScrollSectionComponent', () => {
  let component: SnapScrollSectionComponent;
  let fixture: ComponentFixture<SnapScrollSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapScrollSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapScrollSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
