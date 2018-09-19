import { TestBed, async, ComponentFixture, inject  } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { Component, NgModule, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonServiceService } from './services/common-service.service';
import { FilterPipe } from './pipes/filter.pipe';
import { PagerService } from './services/pageService';
import { AlertsModule } from 'angular-alert-module';
import { Observable, of } from 'rxjs';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const parentTaskDetail: any = [
    {
      "ParentTask": "Parent A",
      "ParentId": 1
     
    },
    {
      "ParentTask": "Parent B",
      "ParentId": 2
     
    },
    {
     "ParentTask": "Parent C",
      "ParentId": 3
     
    }
  ];
  

  const taskDetail: any = [
    {
      "TaskId": 0,
      "ParentTask": 2,
      "Task": "Test A",
      "StartDate": "09/19/2018",
      "EndDate": "09/19/2018",
      "Priority": 10
    },
    {
      "TaskId": 0,
      "ParentTask": 2,
      "Task": "Test B",
      "StartDate": "09/17/2018",
      "EndDate": "09/18/2018",
      "Priority": 20
    },
    {
      "TaskId": 0,
      "ParentTask": 2,
      "Task": "Test C",
      "StartDate": "09/18/2018",
      "EndDate": "09/20/2018",
      "Priority": 30
    }
  ];


  let mockService = {
    getParentTask(): Observable<any> {
      return of(parentTaskDetail);
    },

    getTaskManager(): Observable<any> {
      return of(taskDetail);
    },

    submitTask(task): Observable<any> {
      taskDetail.unshift(task);
      return of(task);
    },

    updateEndTask(task): Observable<any> {
      let idx = taskDetail.findIndex(x => x.TaskId == task.TaskId);
      if (idx !== -1) {
        taskDetail[idx] = task;
      }
      return of(task);
    },
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, AlertsModule,ReactiveFormsModule],
      providers: [{ provide: CommonServiceService, useValue: mockService }, PagerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', async(() => {
     expect(component).toBeTruthy();
  }));

   it('should be get', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getParentTask().subscribe(data => {component.parentTaskList = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

   it('should be get', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getTaskManager().subscribe(data => {component.pagedItems = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));
    
});
