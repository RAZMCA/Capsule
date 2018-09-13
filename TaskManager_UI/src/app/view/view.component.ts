import { Component, OnInit } from '@angular/core';
import{ SharedService } from '../services/sharedService';
import { TaskModel } from '../model/taskmodel';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  list:TaskModel[];
  obj:TaskModel;
  id:number;
  constructor(private _service:SharedService) 
  { 
    this.obj=new TaskModel();
  }

  ngOnInit() 
  {
    this._service.GetAllTask()
    .subscribe(k=>this.list=k);
  }
  SearchTask()
  {
    this._service.SearchTask(this.obj)
    .subscribe(k=>this.list=k)

  }

}
