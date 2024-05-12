import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle, RouterModule, BaseChartDirective],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  isSidePanelOpen: boolean = true;
  postCount = 0;
  userCount = 0;
  commentCount = 0;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Active Users'], ['Inactive Users']];
  public pieChartDatasets: any[] = [{ data: [], label: 'User Status' }];
  public postPieChartLabels = [['Posts'], ['Deleted Posts']];
  public postPieChartDatasets = [{
    data: [400, 600]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  activeUserCount: number = 0;
  inactiveUserCount: number = 0;

  constructor(private adminService: AdminService) {
    this.adminService.getAllPosts('', '').subscribe((res: any) => {
      this.postCount = res?.data.length;
    })

    this.adminService.getAllUsers().subscribe((res: any) => {
      this.userCount = res?.data.length;
      res.data.forEach((user: any) => {
        if (user.active) {
          this.activeUserCount += 1;

          this.pieChartDatasets = [{
          }];
        } else {
          this.inactiveUserCount += 1;
        }
      });

      // Update pie chart datasets
      this.pieChartDatasets[0].data = [this.activeUserCount, this.inactiveUserCount];
    })
    this.adminService.getAllComments().subscribe((comment: any) => {
      this.commentCount = comment.data.length;
    })
  }


  toggleSidePanel(): void {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

}
