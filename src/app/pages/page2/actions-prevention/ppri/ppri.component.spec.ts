import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPRIComponent } from './ppri.component';

describe('PPRIComponent', () => {
  let component: PPRIComponent;
  let fixture: ComponentFixture<PPRIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PPRIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PPRIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
