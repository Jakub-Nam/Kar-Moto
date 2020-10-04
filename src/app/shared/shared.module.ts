import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertComponent } from './alert/alert.component';

const angularMaterial = [
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
];

@NgModule({
    declarations: [
        AlertComponent,

    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        angularMaterial
    ],
    exports: [
        AlertComponent,
        CommonModule,
        FontAwesomeModule,
        angularMaterial
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule { }
