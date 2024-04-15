import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  @Input({required: true}) isSidePanelOpen:boolean = true;

}
