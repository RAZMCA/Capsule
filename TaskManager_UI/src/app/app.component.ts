import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonServiceService } from './services/common-service.service';
import { Http, Response } from '@angular/http';
import { PagerService } from './services/pageService';
import { AlertsModule } from 'angular-alert-module';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PagerService]
})

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppComponent implements OnInit {
  constructor(private appServices: CommonServiceService, private pageService: PagerService, private fb: FormBuilder) { }
  title = 'TaskManager';
  parentTaskList: any;
  taskDetails: any = [];
  pager: any = {};
  pagedItems: any = [];
  page: number;
  response: any;
  search: any = {
    taskSearch: '',
    parentTaskSearch: '',
    priorityFromSearch: '',
    priorityToSearch: '',
    startDateSearch: '',
    endDateSearch: ''
  }

  submitted: boolean = false;
  myForm: FormGroup;

  public ngAfterContentInit() {

  }

  public ngOnInit() {

    this.myForm = this.fb.group({
      TaskId: [''],
      Task: ['', Validators.required],
      Priority: [15, Validators.required],
      ParentId: [''],
      ParentTask:[''],
      StartDate: ['', Validators.required],
      EndDate: [''],
      IsActive: ['']
    });

    this.appServices.getParentTask().subscribe(data => {

      this.parentTaskList = data;
    });

    this.getTaskManager();


  };

  getTaskManager() {

    this.appServices.getTaskManager().subscribe(data => {

      this.taskDetails = data;

      this.setPage(1);
    });
  };



  onSubmit() {
    this.submitted = true;

    if (this.myForm.valid) {

      if (this.compareTwoDates(this.myForm.value)) {

        this.appServices.submitTask(this.myForm.value).subscribe(data => {
          if (data) {
            alert(`Data ${data == 1 ? 'Added' : 'Updated'} successfully...`);
            this.myForm.reset();
            this.submitted = false;
            this.getTaskManager();
          }
          else {
            alert('Please try again..');
          }
        });
      }
      else {
        alert('End Date should be greater than Start Date');
      }

    }

  };

  public EditTask(task) {
    debugger;
    $('.task-manager-page a[href="#addTask"]').tab('show');
    if (task.StartDate != null)
      task.StartDate = task.StartDate.slice(0, -9);
    if (task.EndDate != null)
      task.EndDate = task.EndDate.slice(0, -9);

      var vForm={ 
        StartDate: task.StartDate,
        EndDate: task.EndDate,
        TaskId: task.TaskId,
        Task: task.Task,
        ParentTask: task.ParentTask,
        ParentId: task.ParentId,
        Priority: task.Priority,
        IsActive: task.IsActive
        
      };
    this.myForm.setValue(vForm);
  };

  public EndTask(task) {
    this.appServices.updateEndTask(task).subscribe(data => {

      this.getTaskManager();
      alert(`Data updated successfully...`);
    });
  }

  public ResetTask() {
    this.myForm.reset();
    this.submitted = false;
  }

  setPage(page: number) {
    if (this.pager.totalPages != 0) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }
    // get pager object from service
    this.pager = this.pageService.getPager(this.taskDetails.length, page);
    // get current page of items
    this.pagedItems = this.taskDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
  };


  compareTwoDates(data) {
    if (data.EndDate != null && data.EndDate != '') {
      if (new Date(data.EndDate) < new Date(data.StartDate))
        return false;

      else
        return true;
    }
    else {
      return true;
    }


  }
}