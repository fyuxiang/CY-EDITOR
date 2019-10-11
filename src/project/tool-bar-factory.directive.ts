import { Directive, ElementRef, Input, OnInit, Inject, HostListener, forwardRef, Renderer2} from '@angular/core';
import { CYTOSCAPE, CyProComponent} from './cy-property.component';
const iconMap = {
    enlarge: 'salus-icon-enlarge',
    shrink: 'salus-icon-shrink',
    fit: 'salus-icon-refresh-o',
    undo: 'salus-icon-back-o',
    redo: 'salus-icon-check-o',
    copy: 'salus-icon-check-o',
    paste: 'salus-icon-check-o',
    delete: 'salus-icon-check-o',
    selectAll: 'salus-icon-check-o',
};
@Directive({
    selector: '[appCommander]'
})
export class ToolBarDirective implements OnInit {
    @Input() appCommander: string;
    constructor(private el: ElementRef,
        public rd: Renderer2,
        @Inject(forwardRef(() => CyProComponent))private cy: any) {
    }
    @HostListener('click') onclick(e) {
        this.cy[this.appCommander]();
    }
    ngOnInit() {
        console.log(this.appCommander, this.cy);
        const i = this.rd.createElement('i');
        this.rd.addClass(i, iconMap[this.appCommander]);
        this.rd.appendChild(this.el.nativeElement, i);
    }
    createIcon() {

    }
}
