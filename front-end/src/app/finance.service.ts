import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = 'http://localhost:3000/finance'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createInvoice(invoiceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/invoice`, invoiceData);
  }


  getProjectInvoices(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/project/${projectId}`);
  }

  payInvoice(invoiceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay/${invoiceId}`, {});
  }

  getSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/summary`);
  }

  getUnpaidInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unpaid`);
  }

  getPaidInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paid`);
  }

  getInvoiceById(invoiceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${invoiceId}`);
  }
}