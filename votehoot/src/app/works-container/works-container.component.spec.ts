import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksContainerComponent } from './works-container.component';

describe('WorksContainerComponent', () => {
  let component: WorksContainerComponent;
  let fixture: ComponentFixture<WorksContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorksContainerComponent]
    });
    fixture = TestBed.createComponent(WorksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
