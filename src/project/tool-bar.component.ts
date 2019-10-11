import { Component, OnInit, AfterViewInit, ElementRef, Input, Renderer2, forwardRef, Inject } from '@angular/core';
import { CyProComponent } from './cy-property.component';

@Component({
    selector: 'app-tb',
    templateUrl: `./tool-bar.component.html`,
    styles: [`
    .tb-container{
        width:100%;
        height:50px;
        position:absolute;
    }
    `]
})
export class ToolBarComponent implements OnInit {
    @Input() option: any;
    cy: any;
    orders: string[] = ['enlarge', 'shrink', 'fit', 'undo', 'redo', 'copy', 'paste', 'delete', 'selectAll'];
    constructor(private el: ElementRef,
        public rd: Renderer2) {
    }
    ngOnInit() {
    }
}
