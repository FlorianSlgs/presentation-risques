import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAPIComponent } from './papi.component';

describe('PAPIComponent', () => {
  let component: PAPIComponent;
  let fixture: ComponentFixture<PAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PAPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
