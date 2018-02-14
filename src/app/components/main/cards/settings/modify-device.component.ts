import { Component, Inject } from "@angular/core";
import { OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
    selector: 'app-modify-device',
    template: `<h2 mat-dialog-title>Modify device</h2>
                <mat-dialog-content>
                <form #f>
                    <mat-form-field>
                        <input matInput value="{{data.name}}" placeholder="Device Name" #name required/>
                        <mat-error>Name cannot be empty</mat-error>
                    </mat-form-field>
                    <mat-form-field>
                        <input matInput value="{{data.topic}}" placeholder="Device Topic" #topic required/>
                        <mat-error>Name cannot be empty</mat-error>
                    </mat-form-field>
                </form>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-raised-button color="accent" [mat-dialog-close]="false" >Cancel</button>
                    <button mat-raised-button color="accent" (click)="submit(name,topic)" >Add</button>
                </mat-dialog-actions>`,

})
export class ModifyDeviceComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private currentDialog: MatDialogRef<ModifyDeviceComponent>) {}
    
    ngOnInit() {
        this.currentDialog.disableClose = true;
    }

    submit(name,topic) {
        if (name.value != null && topic.value != null) {
            this.currentDialog.close({name: name.value, topic: topic.value});
        } else {}
        // return {name: name.value, topic: topic.value}
        // {name: device.value, topic: topic.value}
    }
}