/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinanceManagerScholarshipAttachmentComponent } from './finance-manager-scholarship-attachment.component';

describe('FinanceManagerScholarshipAttachmentComponent', () => {
  let component: FinanceManagerScholarshipAttachmentComponent;
  let fixture: ComponentFixture<FinanceManagerScholarshipAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceManagerScholarshipAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceManagerScholarshipAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
