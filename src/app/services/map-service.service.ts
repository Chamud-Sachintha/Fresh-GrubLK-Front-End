import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SetLocationComponent } from '../modules/dashboard-module/customer/set-location/set-location.component';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor(private dialog: MatDialog) { }

  openMapDialog(address?: string) {
    const dialogRef = this.dialog.open(SetLocationComponent, {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      data : address ? address : ''
    });

    return dialogRef;
  }
}
