import { NgModule } from "@angular/core";
import { MatSidenavModule, MatToolbarModule, MatCardModule, MatListModule, MatButtonModule, MatSelectModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
    imports: [ MatSidenavModule,
         MatToolbarModule,
          MatCardModule,
           MatListModule,
            MatButtonModule,
             MatSelectModule,
             MatIconModule,
             MatDialogModule,
             MatFormFieldModule,
             MatInputModule,
             MatSlideToggleModule
             ],
    exports: [ MatSidenavModule,
         MatToolbarModule,
          MatCardModule,
           MatListModule,
            MatButtonModule,
             MatSelectModule,
             MatIconModule,
             MatDialogModule,
             MatFormFieldModule,
             MatInputModule,
             MatSlideToggleModule
             ]
})

export class Material {}