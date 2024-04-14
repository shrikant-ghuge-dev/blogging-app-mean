import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PostService } from '../../../Services/post.service';
import { UserService } from '../../../Services/user.service';

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

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDatasets = [{
    data: [300, 500, 100]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private postService: PostService, private userService: UserService) {
    this.postService.getAllPosts('', '').subscribe((res: any) => {
      this.postCount = res?.data.length;
    })

    this.userService.getAllUsers().subscribe((res: any) => {
      this.userCount = res?.data.length;
    })
  }


  toggleSidePanel(): void {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

}
