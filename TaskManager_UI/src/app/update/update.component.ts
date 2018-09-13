import { Component, OnInit } from '@angular/core';
import{ SharedService } from '../services/sharedService';
import { TaskModel } from '../model/taskmodel';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  list:TaskModel[];
  obj:TaskModel;
  returnObj:Boolean;
  constructor(private _service:SharedService) 
  { 
    this.obj=new TaskModel();
  }

  ngOnInit() 
  {
  }
  UpdateTask()
  {
    this._service.UpdateTask(this.obj)
    .subscribe(k=>this.returnObj=k)

  }
}
