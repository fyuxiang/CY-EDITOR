import { Directive, ElementRef, Input, OnInit, Inject, HostListener, forwardRef, Renderer2} from '@angular/core';
import { CyEditorComponent } from './cy-editor.component';

const iconMap = {
    enlarge: 'salus-icon-enlarge',
    shrink: 'salus-icon-shrink',
    fit: 'salus-icon-refresh-o',
    undo: 'salus-icon-back-o',
    redo: 'salus-icon-check-o',
};
const spanMap = {
    enlarge: '放大',
    shrink: '缩小',
    fit: '重置',
    undo: '撤销',
    redo: '重做',
    copy: '复制',
    paste: '粘贴',
    selectAll: '全选',
    delete: '删除',

};
@Directive({
    selector: '[appCommander]'
})
export class ToolBarDirective implements OnInit {
    @Input() appCommander: string;
    constructor(private el: ElementRef,
        public rd: Renderer2,
        @Inject(forwardRef(() => CyEditorComponent))private cy: any) {
    }
    @HostListener('click') onclick() {
        this.cy[this.appCommander]();
    }
    ngOnInit() {
        console.log(this.appCommander, this.cy);
        const i = this.rd.createElement('i');
        const span = this.rd.createElement('span');
        span.innerHTML = spanMap[this.appCommander];
        this.rd.addClass(i, iconMap[this.appCommander]);
        this.rd.appendChild(this.el.nativeElement, i);
        this.rd.appendChild(this.el.nativeElement, span);
    }
    createIcon() {

    }
}
