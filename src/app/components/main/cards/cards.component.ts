import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'LineChart'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 2, 3]
    }]
  });
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if( result !== false ) {
        
        this.chart.addPoint(parseInt(result));
      }
    });

  }

}
