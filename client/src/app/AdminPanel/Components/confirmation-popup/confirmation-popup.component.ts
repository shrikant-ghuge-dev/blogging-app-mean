import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.scss'
})
export class ConfirmationPopupComponent {
  @Input({required: true}) isPopupVisible!: boolean;
  @Input({ required: true }) textMsg!: string;
  @Output() btnClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelBtnClick: EventEmitter<any> = new EventEmitter<any>();

  togglePopup() {
    this.cancelBtnClick.emit();
  }

  onDeleteUser() {
    this.btnClick.emit();
  }
}
