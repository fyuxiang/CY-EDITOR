import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyEditorComponent } from './cy-editor.component';

describe('CyEditorComponent', () => {
  let component: CyEditorComponent;
  let fixture: ComponentFixture<CyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
