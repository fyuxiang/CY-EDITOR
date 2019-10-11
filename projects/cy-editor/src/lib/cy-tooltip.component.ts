// tslint:disable-next-line:max-line-length
import { Component, OnInit, ElementRef, Renderer2, forwardRef, Inject, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CyEditorComponent } from './cy-editor.component';

@Component({
    selector: 'app-tooltip',
    template: `
        <div>
            <ul>
                <li>{{title}}</li>
                <li><i class="salus-icon-enlarge"></i><span [innerHTML]='total'></span></li>
                <li><i class="salus-icon-enlarge"></i><span [innerHTML]='error'></span></li>
            </ul>
        </div>
    `,
    styles: [`
    :host{
        position: fixed;
        top: -999px;
        width: auto;
        left: -999px;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        display: block;
        border-style: solid;
        white-space: nowrap;
        z-index: 9999999;
        transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        background-color: rgba(50, 50, 50, 0.7);
        border-width: 0px;
        border-color: rgb(51, 51, 51);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        font-stretch: normal;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        line-height: 21px;
    }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolTipComponent implements OnInit, OnDestroy {
    private _value: any[];
    title = '123';
    total = '123';
    error = '123';
    @HostBinding('style.top') top = '-999px';
    @HostBinding('style.left') left = '-999px';
    @HostBinding('style.display') display = 'none';
    constructor(private el: ElementRef,
        public rd: Renderer2,
        @Inject(forwardRef(() => CyEditorComponent))private cy: any,
        public change: ChangeDetectorRef) {
    }
    ngOnInit() {
        this.bindEvent();
    }
    bindEvent() {
        const that = this;
        this.cy.cy.on('mousemove', 'node, :parent', function(e) {
            const event = e.originalEvent;
            that.display = 'block';
            that.left = `${(event.x || event.clientX) + 8}px`, that.top = `${(event.y || event.clentY) + 8}px`;
        });
        this.cy.cy.on('mouseout', 'node', function(e) {
            that.display = 'none';
        });
    }
    ngOnDestroy() {
        this.cy.cy.removeAllListeners();
    }
}
