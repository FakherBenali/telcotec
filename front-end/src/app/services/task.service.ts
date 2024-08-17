import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://127.0.0.1:3000/task/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url + 'all');
  }

  unusedTasks(): Observable<any> {
    return this.http.get<any>(this.url + 'unused-tasks');
  }

  save(date: FormData): Observable<any> {
    return this.http.post(this.url + 'save', date);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  update(id: string, date: FormData): Observable<any> {
    return this.http.put(this.url + 'update/' + id, date);
  }
  
  createTask(taskData: any): Observable<any> {
    return this.http.post('/api/tasks', taskData);
  }

  calculatePrice(target: any): Observable<any> {
    return this.http.post('/api/calculate-price', target);
  }
  
}
