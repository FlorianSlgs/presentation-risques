import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPreventionComponent } from './actions-prevention.component';

describe('ActionsPreventionComponent', () => {
  let component: ActionsPreventionComponent;
  let fixture: ComponentFixture<ActionsPreventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsPreventionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsPreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
