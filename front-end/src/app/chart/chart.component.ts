import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule]
})
export class ChartComponent implements OnInit {
handleClick($event: MouseEvent) {
throw new Error('Method not implemented.');
console.log('Unpaid Amount:', this.unpaidAmount);
console.log('Paid Amount:', this.paidAmount);

}
  chart: any;
  isButtonVisible = false;
  options: any = {};
  unpaidAmount: number = 0;
  paidAmount: number = 0;
chartOptions: any;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.financeService.getUnpaidInvoices().subscribe(
      (unpaidInvoices: any[]) => {
        this.unpaidAmount = unpaidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
        this.updateChart();
      },
      error => console.error('Error fetching unpaid invoices:', error)
    );

    this.financeService.getPaidInvoices().subscribe(
      (paidInvoices: any[]) => {
        this.paidAmount = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
        this.updateChart();
      },
      error => console.error('Error fetching paid invoices:', error)
    );
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.options = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Paid and Unpaid Tasks"
        },
        data: [{
          type: "pie",
          name: "Tasks",
          startAngle: 90,
          cursor: "pointer",
          showInLegend: true,
          legendMarkerType: "square",
          dataPoints: [
            { y: this.paidAmount, name: "Paid", color: "#058dc7" },
            { y: this.unpaidAmount, name: "Unpaid", color: "#50b432" }
          ]
        }]
      };
      this.chart.render();
    }
  }

  getChartInstance(chart: any): void {
    this.chart = chart;
    this.updateChart();
  }
  
}
