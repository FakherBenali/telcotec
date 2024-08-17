import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http: HttpClient ) { }

  private url = 'http://127.0.0.1:3000/task/'

  getAll(){

    return this.http.get(this.url + 'all' );

  }
  unusedTasks() {
    return this.http.get(this.url + 'unused-tasks')
  }
  save(date: any){

    return this.http.post(this.url + "/save", date);

  }

  
  delete(id: any){

    return this.http.delete(this.url + id);

  }

  update(id: any,date:any){

    return this.http.put(this.url + "/update/"+id , date);

  }
  
  createTask(taskData: any): Observable<any> {
    return this.http.post('/api/tasks', taskData);
  }

  calculatePrice(target: any): Observable<any> {
    return this.http.post('/api/calculate-price', target);
  }
  
}
