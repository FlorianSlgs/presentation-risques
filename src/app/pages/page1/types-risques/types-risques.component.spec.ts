import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesRisquesComponent } from './types-risques.component';

describe('TypesRisquesComponent', () => {
  let component: TypesRisquesComponent;
  let fixture: ComponentFixture<TypesRisquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesRisquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesRisquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
