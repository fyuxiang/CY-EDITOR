import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CyEditorComponent} from './cy-editor.component';
import {ToolBarComponent} from './tool-bar.component';
import {ToolBarDirective} from './tool-bar-factory.directive';
import { ToolTipComponent } from './cy-tooltip.component';
import { ToolItemDirective } from './tool-item.directive';
import { ContextMenuComponent } from './context-menu.component';

@NgModule({
  declarations: [
    CyEditorComponent,
    ToolBarComponent,
    ToolBarDirective,
    ToolTipComponent,
    ToolItemDirective,
    ContextMenuComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    CyEditorComponent,
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
export class CyEditorModule { }
