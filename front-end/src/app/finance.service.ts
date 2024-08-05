import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

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
    return this.http.get<any[]>(`${this.apiUrl}/summary`).pipe(
      tap(data => console.log('Data fetched from getSummary:', data)),
      catchError(this.handleError('getSummary', []))
    );
  }
  

  getUnpaidInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unpaid`).pipe(
      tap(data => console.log('Raw data received from getUnpaidInvoices:', data)),
      map(invoices => invoices.map(invoice => ({
        financeId: invoice._id || 'N/A', // Default value if null/undefined
        projectName: invoice.projectName || 'No Project Name',
        userId: invoice.user ? invoice.user._id : 'No User ID',
        userName: invoice.user ? `${invoice.user.firstName} ${invoice.user.lastName}` : 'Unknown User',
        amount: invoice.amount || 0,
        totalPaid: invoice.amount || 0
      })))
      
    );
  }
  
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  
  getPaidInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paid`).pipe(
      map(invoices => invoices.map(invoice => ({
        financeId: invoice._id,
        projectName: invoice.projectName,
        userId: invoice.user._id,
        userName: `${invoice.user.firstName} ${invoice.user.lastName}`,
        amount: invoice.amount,
        totalPaid: invoice.amount
      })))
    );
  }

  getInvoiceById(invoiceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${invoiceId}`);
  }
}
