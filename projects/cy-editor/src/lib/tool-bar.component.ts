import { Component, OnInit, AfterViewInit, ElementRef, Input, Renderer2, forwardRef, Inject } from '@angular/core';

@Component({
    selector: 'app-tb',
    templateUrl: `./tool-bar.component.html`,
    styles: [`
    .tb-container{
        width:100%;
        height:50px;
        position:absolute;
    }
    .order-item {
        padding-right:8px;
        cursor: pointer;
    }
    `]
})
export class ToolBarComponent implements OnInit {
    @Input() option: any;
    cy: any;
    orders: string[] = ['enlarge', 'shrink', 'fit', 'undo', 'redo', 'copy', 'paste', 'delete', 'selectAll', 'pan', 'select'];
    constructor(private el: ElementRef,
        public rd: Renderer2) {
    }
    ngOnInit() {
    }
}
