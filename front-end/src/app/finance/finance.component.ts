import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../finance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { NavbarModule } from '../navbar/navbar.module';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTabsModule,
    MatCardModule,  
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NavbarModule
  ]
})
export class FinanceComponent implements OnInit {
  summaryData: any[] = [];
  unpaidInvoices: any[] = [];
  paidInvoices: any[] = [];
  users: any[] = [];
  projects: any[] = [];
  financeForm: FormGroup;
  filteredFinances: any[] = [];
  selectedUserId: string = '';
  selectedStatus: string = '';

  summary: { totalPaid: number, totalUnpaid: number, totalAmount: number } = {
    totalPaid: 0,
    totalUnpaid: 0,
    totalAmount: 0
  };

  constructor(
    private financeService: FinanceService,
    private userService: UserService,
    private projectService: TaskService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.financeForm = this.fb.group({
      projectId: ['', Validators.required],
      userId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      status: ['unpaid', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSummary();
    this.loadUnpaidInvoices();
    this.loadPaidInvoices();
    this.loadUsers();
    this.loadProjects();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (users: any) => this.users = users,
      error: (error: any) => console.error('Error loading users', error)
    });
  }

  loadProjects() {
    this.projectService.unusedTasks().subscribe({
      next: (projects: any) => this.projects = projects,
      error: (error: any) => console.error('Error loading projects', error)
    });
  }

  onSubmit() {
    if (this.financeForm.valid) {
      this.financeService.createInvoice(this.financeForm.value).subscribe({
        next: () => {
          this.showSuccess('Invoice created successfully');
          this.financeForm.reset({status: 'unpaid'});
          this.loadSummary();
          this.loadUnpaidInvoices();
          this.loadPaidInvoices();
          this.loadUsers();
          this.loadProjects();
        },
        error: (error) => this.showError('Failed to create invoice')
      });
    }
  }

  loadSummary(): void {
    this.financeService.getSummary().subscribe({
      next: (data: any[]) => {
        console.log(data);
        this.summaryData = data;
        this.filterFinances();
      },
      error: () => this.showError('Failed to load summary')
    });
  }

  loadUnpaidInvoices(): void {
    this.financeService.getUnpaidInvoices().subscribe({
      next: (data: any[]) => {
        console.log("unpaid", data);
        this.unpaidInvoices = data;
        this.filterFinances();
      },
      error: () => this.showError('Failed to load unpaid invoices')
    });
  }

  loadPaidInvoices(): void {
    this.financeService.getPaidInvoices().subscribe({
      next: (data: any[]) => {
        console.log(data);
        this.paidInvoices = data;
        this.filterFinances();
      },
      error: () => this.showError('Failed to load paid invoices')
    });
  }

  payInvoice(invoiceId: string): void {
    this.financeService.payInvoice(invoiceId).subscribe({
      next: () => {
        this.showSuccess('Invoice paid successfully');
        this.loadUnpaidInvoices();
        this.loadPaidInvoices();
        this.loadSummary();
        this.loadUsers();
        this.loadProjects();
      },
      error: () => this.showError('Failed to pay invoice')
    });
  }

  onUserSelect(event: Event) {
    this.selectedUserId = (event.target as HTMLSelectElement).value;
    this.filterFinances();
  }
  onStatusSelect(event: any) {
    this.selectedStatus = event.target.value;
    this.filterFinances();
  }



  filterFinances() {
    const allFinances = [...this.summaryData];
    if (this.selectedUserId) {
      this.filteredFinances = allFinances.filter(f => f.userId === this.selectedUserId);
    } else {
      this.filteredFinances = allFinances;
    }
    if (this.selectedStatus) {
      this.filteredFinances = allFinances.filter(f => this.selectedStatus === 'Paid' ? f.totalPaid > 0 : f.totalPaid == 0);
    } else {
      this.filteredFinances = allFinances;
    }


    this.calculateSummary();
  }

  calculateSummary() {
    this.summary = this.filteredFinances.reduce((acc, finance) => {
      acc.totalAmount += finance.totalAmount;
      acc.totalPaid += finance.totalPaid;
      acc.totalUnpaid += finance.totalUnpaid;
      return acc;
    }, { totalPaid: 0, totalUnpaid: 0, totalAmount: 0 });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}