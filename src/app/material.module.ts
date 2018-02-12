import { NgModule } from "@angular/core";
import { MatSidenavModule, MatToolbarModule, MatCardModule, MatListModule, MatButtonModule, MatSelectModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';

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
             MatSlideToggleModule,
             MatTabsModule
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
             MatSlideToggleModule,
             MatTabsModule
             ]
})

export class Material {}