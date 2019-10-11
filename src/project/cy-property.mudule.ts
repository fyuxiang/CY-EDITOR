import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CyProComponent} from './cy-property.component';
import {ToolBarComponent} from './tool-bar.component';
import {ToolBarDirective} from './tool-bar-factory.directive';
import { ToolTipComponent } from './cy-tooltip.component';
import { ToolItemDirective } from './tool-item.directive';
import {ContextMenuComponent} from './context-menu.component';

@NgModule({
  declarations: [
    CyProComponent,
    ToolBarComponent,
    ToolBarDirective,
    ToolTipComponent,
    ContextMenuComponent,
    ToolItemDirective,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    CyProComponent,
    ToolBarComponent,
    ToolBarDirective,
    ToolTipComponent,
    ToolItemDirective,
    ContextMenuComponent,
  ],
  entryComponents: [ToolTipComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CyModule { }
