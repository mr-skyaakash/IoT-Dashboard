import { NgModule } from "@angular/core";
import { MatSidenavModule, MatToolbarModule, MatCardModule, MatListModule, MatButtonModule, MatSelectModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';

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
             MatInputModule
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
             MatInputModule
             ]
})

export class Material {}