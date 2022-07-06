import { NgModule } from '@angular/core';

import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
    exports: [
        A11yModule,
        ClipboardModule,
        DragDropModule,
        PortalModule,
        ScrollingModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule
    ]
})
export class CdkModule { }