import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddDeviceService } from '../../../../services/devices/admin/add-device.service';


@Component({
    selector: 'app-modify-device',
    template: `<h2 mat-dialog-title>Modify device</h2>
                <mat-dialog-content>
                <form #f>
                    <mat-form-field>
                        <input matInput value='{{data.name}}' placeholder='Device Name' #name required/>
                        <mat-error>Name cannot be empty</mat-error>
                    </mat-form-field>
                    <mat-form-field>
                        <input matInput value='{{data.topic}}' placeholder='Device Topic' #topic required/>
                        <mat-error>Name cannot be empty</mat-error>
                    </mat-form-field>
                    <mat-form-field>
                        <mat-select placeholder="Role" value="{{data.type}}" #type required>
                        <mat-option *ngFor="let type of types" [value]="type.dev_type">
                            {{ type.dev_type | capInit }}
                        </mat-option>
                        </mat-select>
                    </mat-form-field>
                </form>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-raised-button color='accent' [mat-dialog-close]='false' >Cancel</button>
                    <button mat-raised-button color='accent' (click)='submit(name,topic,type)' >Add</button>
                </mat-dialog-actions>`,

})
export class ModifyDeviceComponent implements OnInit {
    constructor(private fetchType: AddDeviceService ,@Inject(MAT_DIALOG_DATA) public data: any, private currentDialog: MatDialogRef<ModifyDeviceComponent>) {}
    types : Array<any>;
    ngOnInit() {
        this.currentDialog.disableClose = true;
        this.types = this.fetchType.fetchDeviceType();
        console.log(this.data);
    }

    submit(name, topic, type) {
        if (name.value != null && topic.value != null && type.value !== null) {
            this.currentDialog.close({name: name.value, topic: topic.value, type: type.value});
        } else {}
        // return {name: name.value, topic: topic.value}
        // {name: device.value, topic: topic.value}
    }
}
