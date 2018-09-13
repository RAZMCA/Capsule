import { Component, OnInit } from '@angular/core';
import{ SharedService } from '../services/sharedService';
import { TaskModel } from '../model/taskmodel';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  list:TaskModel[];
  obj:TaskModel;
  returnObj:Boolean;
  constructor(private _service: SharedService) 
  { 
    this.obj=new TaskModel();
  }

  ngOnInit() 
  {
  }
  AddTask()
  {
    this._service.AddTask(this.obj)
    .subscribe(k=>this.returnObj=k)

  }

}
