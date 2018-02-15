import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dialog',
    template: `<h2 mat-dialog-title>Enter new point</h2>
                <mat-dialog-content>
                    <mat-form-field>
                        <input matInput placeholder='New Value' #point/>
                    </mat-form-field>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-raised-button color='accent' [mat-dialog-close]='false' >Cancel</button>
                    <button mat-raised-button color='accent' [mat-dialog-close]='point.value' >Add</button>
                </mat-dialog-actions>`
})
export class DialogComponent implements OnInit {
    ngOnInit() {}
}