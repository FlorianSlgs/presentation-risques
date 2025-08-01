import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InondationComponent } from './inondation.component';

describe('InondationComponent', () => {
  let component: InondationComponent;
  let fixture: ComponentFixture<InondationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InondationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InondationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
