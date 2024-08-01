import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskComponent } from '../task/task.component'; 
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://127.0.0.1:3000/task/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TaskComponent[]> {
    return this.http.get<TaskComponent[]>(this.url + 'all');
  }

  unusedTasks(): Observable<TaskComponent[]> {
    return this.http.get<TaskComponent[]>(this.url + 'unused-tasks');
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
}
