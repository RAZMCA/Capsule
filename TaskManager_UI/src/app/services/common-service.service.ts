import { Component,NgModule,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

var apiURL="http://localhost:33424/";

@Injectable({
  providedIn: 'root'
})

 

export class CommonServiceService {

  constructor(public http: HttpClient) { }
 

getParentTask(){    
    return this.http.get(apiURL + "api/Task/GetParentTask"); 
  }

  getTaskManager(){    
    return this.http.get(apiURL + "api/Task/GetAllTask"); 
  }

   submitTask(task){    
    return this.http.post(apiURL + "api/Task/InsertTaskDetails",task); 
  }

    updateEndTask(task){    
    return this.http.post(apiURL + "api/Task/UpdateEndTask",task); 
  }
}
