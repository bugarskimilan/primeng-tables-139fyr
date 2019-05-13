import { Component } from '@angular/core';
import { dataService } from './data.service';

export class ReportConfigModel {
  ReportID: number;
  ReportName: string;
  AlternativeReportName: string;
  DeliveryList: number[];
}

export class DeliveryListModel {

}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: any[];

  cols: any[] = [];

  constructor(private dataservice: dataService) {
    this.cols = this.getColumnsFromDataset(dataservice.data);
    this.data = this.generateTableData(dataservice.data, this.cols);
  }

  // this can be done in map functuion directly from api call
  private generateTableData(data: any[], reports: any[]): any[] {
    // mutate data to calculate fund row to create info about checkboxes
    data.forEach(fund => {
      fund.reports = reports.map(r => {
        let userDeliveryArray = this.getReportDeliveryListForFund(fund, r.ReportID);
        return { ...r, deliveredToUsers: (userDeliveryArray.length == fund.users.length) ? 'all' : userDeliveryArray.length > 0 ? 'partial' : 'none' }
      });
    })
    return data;
  }

  private getColumnsFromDataset(data: any[]): any[] {
    let cols: any[] = [];
    if (data[0] && data[0].users[0] && data[0].users[0].reports) {
      (data[0].users[0].reports as any[]).forEach(r => {
        cols.push({
          ReportID: r.ReportID,
          ReportName: r.ReportName
        })
      });
    }
    return cols;
  }

  private getReportDeliveryListForFund(fund: any, reportid: number): number[] {
    let reportDeliveryList: number[] = (fund.users as any[]).reduce((acc : number[], user) => {
      if ((user.reports as any[]).find(r => r.ReportID == reportid && r.isDeliveredToUser == 1)) {
        return [...acc, user.UserID];
      }
      else return acc;
    }, []);
    
    return reportDeliveryList || [];
  }

  dataChanged(e){
    // recalc the state
    this.data = this.generateTableData(this.data, this.cols);
    // set dirty state
  }

  fundGroupSelectionChange(e, fund, reportid){
    if (e){
      (fund.users as any[]).forEach(user => {
        (user.reports as any[]).find(r => r.ReportID == reportid).isDeliveredToUser = 1;
      })
    }
    else{
      (fund.users as any[]).forEach(user => {
        (user.reports as any[]).find(r => r.ReportID == reportid).isDeliveredToUser = 0;
      })
    }

    this.data = this.generateTableData(this.data, this.cols);
  }

  selectedReport : any;
  showEditReportNameDialog : boolean = false;
  editReportName(report){
    // here prompt the text input to edit the name, and 
    // immediatley save to databese + refresh viewmodel
    this.selectedReport = report;
    this.showEditReportNameDialog = true;
  }

}
