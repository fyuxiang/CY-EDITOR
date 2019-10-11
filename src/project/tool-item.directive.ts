import { Directive, ElementRef, Input, OnInit, Inject, HostListener, forwardRef, Renderer2, InjectionToken, ViewChild, OnDestroy } from '@angular/core';
import { CyProComponent } from './cy-property.component';
import { ItemDragOverService } from './item-drag.service';
import { Subject } from 'rxjs';
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[cyItem]',
})
export class ToolItemDirective implements OnInit, OnDestroy {
    // TODO 类型还没定义
    @Input() appItem: any;
    private ID = Date.now();
    public sub: Subject<any>;
    constructor(private el: ElementRef,
        public rd: Renderer2,
        public dragService: ItemDragOverService) {
    }
    @HostListener('dragstart', ['$event']) ondragstart(e: DragEvent) {
        e.dataTransfer.setData('Text', JSON.stringify(this.appItem));
        this.visitor();
    }
    visitor() {
        this.sub = new Subject();
        this.sub.subscribe((res) => {
            const cy = this.dragService.getCY();
            const node = cy.add([{
                'data': {
                    'id': Math.random(),
                    label: this.ID,
                    'shape': 'ellipse',
                    prop: [{ className: 'eee', text: 'test' }, { className: 'cat', text: 'testasdasdasasdad' }]
                },
                classes: 'red',
                renderedPosition: this.getRenderedPostion(cy.cy, { x: res[1].offsetX, y: res[1].offsetY })
            }])
        });
        this.dragService.register(this.ID, this.sub);
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = null;
    }
    getRenderedPostion(cy, position) {
        const zoom = cy.zoom(), node = cy.nodes(), w = node.renderedWidth(), h = node.renderedHeight();
        const { x, y } = position;
        return {
            x: x + w / 2,
            y: y,
        };
    }
}
