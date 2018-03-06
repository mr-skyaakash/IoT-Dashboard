import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AddDeviceService } from '../../../../services/devices/add-device.service';

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
                    <mat-form-field>
                        <mat-select placeholder="Role" #type required>
                        <mat-option *ngFor="let type of types" [value]="type.dev_type">
                            {{ type.dev_type | capInit }}
                        </mat-option>
                        </mat-select>
                    </mat-form-field>
                </form>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-raised-button color='accent' [mat-dialog-close]='false' >Cancel</button>
                    <button mat-raised-button color='accent' (click)='submit(device,topic,type)' >Add</button>
                </mat-dialog-actions>`
})
export class AddDeviceComponent implements OnInit {

    types: Array<any>;

    constructor( private fetchType: AddDeviceService , private currentDialog: MatDialogRef<AddDeviceComponent>) {}

    ngOnInit() {
        this.currentDialog.disableClose = true;
        this.types = this.fetchType.fetchDeviceType();
    }

    submit(dev, topic, type) {
        if (dev.value !== '' && topic.value !== '' && type.value !== '') {
            this.currentDialog.close({name: dev.value, topic: topic.value, type: type.value});
        } else {
            this.currentDialog.close(false);
        }
        // return {name: dev.value, topic: topic.value}
        // {name: device.value, topic: topic.value}
    }
}