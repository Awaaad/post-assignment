import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  public desactivateCustomerFromTable: boolean;
  public customerName: string;
  public activate: boolean;
  public headerText: string;
  public messageText: string;
  public positiveButton: string;
  public negativeButton: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.desactivateCustomerFromTable = data.desactivateCustomerFromTable;
    this.customerName = data.customerName;
    this.activate = data.activate;
    this.headerText = data.headerText;
    this.messageText = data.messageText;
    this.positiveButton = data.positiveButton;
    this.negativeButton = data.negativeButton;
  }

  ngOnInit(): void {

  }

  close(confirm: boolean) {
    this.dialogRef.close(confirm);
  }


}
