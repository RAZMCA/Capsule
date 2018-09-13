import { Component,NgModule,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Observable';
import { TaskModel } from '../model/taskmodel';

@Injectable({
  providedIn: 'root'
})

 

export class SharedService {
  apiURL:string='http://localhost:33424/api/Task/';
  constructor(private _http:Http) { }
  GetAllTask():Observable<TaskModel[]>
  {
    return this._http.get(this.apiURL+"GetAllTask")
    .map((data:Response)=><TaskModel[]>data.json());
  }
  GetTaskById(taskId:Number):Observable<TaskModel>
  {
    return this._http.get(this.apiURL+"GetTaskById", { body: taskId})
    .map((data:Response)=><TaskModel>data.json());
  }
  SearchTask(taskModel:TaskModel):Observable<TaskModel[]>
  {
     return this._http.post(this.apiURL+"SearchTask",{ body: taskModel})
    .map((data:Response)=><TaskModel[]>data.json());
  }
  AddTask(taskModel:TaskModel):Observable<boolean>
  {
     return this._http.post(this.apiURL+"AddTask",{ body: taskModel})
    .map((data:Response)=><boolean>data.json());
  }
  UpdateTask(taskModel:TaskModel):Observable<boolean>
  {
     return this._http.post(this.apiURL+"UpdateTask",{ body: taskModel})
    .map((data:Response)=><boolean>data.json());
  }
  DeleteTask(taskId:Number):Observable<boolean>
  {
     return this._http.post(this.apiURL+"DeleteTask",{ body: taskId})
    .map((data:Response)=><boolean>data.json()); 
  }
  
  
}