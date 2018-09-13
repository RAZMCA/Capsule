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







// import { Injectable } from '@angular/core';


// export class SharedService {
//     getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
//         // calculate total pages
//         let totalPages = Math.ceil(totalItems / pageSize);
 
//         // ensure current page isn't out of range
//         if (currentPage < 1) { 
//             currentPage = 1; 
//         } else if (currentPage > totalPages) { 
//             currentPage = totalPages; 
//         }
         
//         let startPage: number, endPage: number;
//         if (totalPages <= 10) {
//             // less than 10 total pages so show all
//             startPage = 1;
//             endPage = totalPages;
//         } else {
//             // more than 10 total pages so calculate start and end pages
//             if (currentPage <= 6) {
//                 startPage = 1;
//                 endPage = 10;
//             } else if (currentPage + 4 >= totalPages) {
//                 startPage = totalPages - 9;
//                 endPage = totalPages;
//             } else {
//                 startPage = currentPage - 5;
//                 endPage = currentPage + 4;
//             }
//         }
 
//         // calculate start and end item indexes
//         let startIndex = (currentPage - 1) * pageSize;
//         let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
//         // create an array of pages to ng-repeat in the pager control
//         let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
 
//         // return object with all pager properties required by the view
//         return {
//             totalItems: totalItems,
//             currentPage: currentPage,
//             pageSize: pageSize,
//             totalPages: totalPages,
//             startPage: startPage,
//             endPage: endPage,
//             startIndex: startIndex,
//             endIndex: endIndex,
//             pages: pages
//         };
//     }
// }