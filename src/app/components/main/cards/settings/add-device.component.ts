import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog',
    template: `<h2 mat-dialog-title>Add new device</h2>
                <mat-dialog-content>
                <form #f>
                    <mat-form-field>
                        <input matInput placeholder='Device Name' #device required/>
                        <mat-error>Name cannot be empty</mat-error>
                    </mat-form-field>
                    <mat-form-field>
                        <input matInput placeholder='Device Topic' #topic required/>
                        <mat-error>Name cannot be empty</mat-error>
                    </mat-form-field>
                </form>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-raised-button color='accent' [mat-dialog-close]='false' >Cancel</button>
                    <button mat-raised-button color='accent' (click)='submit(device,topic)' >Add</button>
                </mat-dialog-actions>`
})
export class AddDeviceComponent implements OnInit {

    constructor( private currentDialog: MatDialogRef<AddDeviceComponent>) {}

    ngOnInit() {
        this.currentDialog.disableClose = true;
    }

    submit(dev, topic) {
        if (dev.value !== '' && topic.value !== '') {
            this.currentDialog.close({name: dev.value, topic: topic.value});
        } else {
            this.currentDialog.close(false);
        }
        // return {name: dev.value, topic: topic.value}
        // {name: device.value, topic: topic.value}
    }
}