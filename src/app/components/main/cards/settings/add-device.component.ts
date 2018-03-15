import { Component, OnInit, ChangeDetectorRef, DoCheck, AfterViewChecked } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AddDeviceService } from '../../../../services/devices/admin/add-device.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-dialog',
    template: `<section fxLayout="column" fxLayoutAlign="space-evenly center">
                    <h2 mat-dialog-title>Add new device</h2>
                    <form #f  [formGroup]="addDeviceForm" (submit)="submit($event)">
                    <mat-dialog-content fxLayout fxLayoutAlign="space-evenly center">
                        <section fxLayout="column" fxLayoutAlign="space-evenly center">
                            <mat-form-field>
                                <input matInput formControlName='name' placeholder='Device Name' #device required/>
                                <mat-error>Name cannot be empty</mat-error>
                            </mat-form-field>
                            <mat-form-field>
                                <input matInput formControlName='topic' placeholder='Device Topic' #topic required/>
                                <mat-error>Topic cannot be empty</mat-error>
                            </mat-form-field>
                            <mat-form-field  *ngIf="type.value === 'slider'">
                                <input formControlName='min' type="number" matInput placeholder='Device Min Value' #minval required/>
                                <mat-error>Min. value cannot be empty or lesser than max value</mat-error>
                            </mat-form-field>
                            <mat-form-field  *ngIf="type.value === 'slider'">
                                <input formControlName='max' type="number" matInput placeholder='Device Max Value' #maxval required/>
                                <mat-error>Max. value cannot be empty</mat-error>
                            </mat-form-field>
                            <mat-form-field  *ngIf="type.value === 'slider'">
                                <input formControlName='step' type="number" [min]="deviceMin.value" matInput placeholder='Device Step Value' #stepval required/>
                                <mat-error>Step cannot be empty</mat-error>
                            </mat-form-field>
                            <mat-form-field>
                                <mat-select formControlName='type' [(value)]="selectedType" placeholder="Role" #type required>
                                <mat-option *ngFor="let type of types" [value]="type.dev_type">
                                    {{ type.dev_type | capInit }}
                                </mat-option>
                                </mat-select>
                            </mat-form-field>
                        </section>
                        </mat-dialog-content>
                        <mat-dialog-actions>
                        <button mat-raised-button color='accent' [mat-dialog-close]='false' >Cancel</button>
                        <button type="submit" mat-raised-button color='accent' [disabled]="handleError()">Add</button>
                        </mat-dialog-actions>
                    </form>
                </section>`
})
export class AddDeviceComponent implements OnInit, AfterViewChecked {

    isvalid: any;
    selectedType: any;

    types: Array<any>;
    addDeviceForm: FormGroup;
    deviceName: FormControl;
    deviceTopic: FormControl;
    deviceType: FormControl;
    deviceMin: FormControl;
    deviceMax: FormControl;
    deviceStep: FormControl;

    constructor( private fetchType: AddDeviceService , private currentDialog: MatDialogRef<AddDeviceComponent>,private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.addDeviceForm = new FormGroup({
            name: this.deviceName = new FormControl('', {
                validators: [Validators.required]
            }),
            topic: this.deviceTopic = new FormControl('',{
                validators: [Validators.required]
            }),
            type: this.deviceType = new FormControl('',{
                validators: [Validators.required]
            }),
            min: this.deviceMin = new FormControl(''),
            max: this.deviceMax = new FormControl(''),
            step: this.deviceStep = new FormControl('')
        });

        this.currentDialog.disableClose = true;
        this.types = this.fetchType.fetchDeviceType();
    }

    ngAfterViewChecked() {
        this.cd.detectChanges();
    }

    handleError(){
        if ( this.selectedType === 'slider'  ) {
            if ( this.deviceMin.value < this.deviceMax.value )
                return this.addDeviceForm.invalid;
            return true;
        } else {
            return this.deviceName.invalid || this.deviceTopic.invalid || this.deviceType.invalid
        }
    }

    submit(event) {
        console.log('yo');
        event.preventDefault();

        console.log( this.deviceType.value )
        if ( this.deviceType.value !== 'slider' ) {
            this.currentDialog.close({name: this.deviceName.value, topic: this.deviceTopic.value, type: this.deviceType.value});
        } else {
            if (this.deviceMin.value >= this.deviceMax.value) {
                this.deviceMin.setErrors({'incorrect':true});
            } else {
                this.currentDialog.close({name: this.deviceName.value, topic: this.deviceTopic.value, type: this.deviceType.value,
                    min: this.deviceMin.value, max: this.deviceMax.value, step: this.deviceStep.value});

            }
        }   
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }
}