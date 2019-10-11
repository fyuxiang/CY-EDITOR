// tslint:disable-next-line:max-line-length
import { Component, OnInit, ElementRef, Renderer2, forwardRef, Inject, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ItemDragOverService } from './item-drag.service';

@Component({
    selector: 'app-context-menu',
    template: `
        <div>
            <ul *ngIf ="type == 0">
                <li (click)="run('copy')"><i class="salus-icon-enlarge"></i><span class="item-label">复制</span></li>
                <li (click)="run('delete')"><i class="salus-icon-enlarge"></i><span class="item-label">删除</span></li>
            </ul>
            <ul *ngIf ="type == 1">
                <li (click)="run('delete')"><i class="salus-icon-enlarge"></i><span class="item-label">删除</span></li>
            </ul>
            <ul *ngIf ="type == 2">
                <li *ngIf ="isSelectAll"  (click)="run('copy')"><i class="salus-icon-enlarge"></i><span class="item-label">复制</span></li>
                <li (click)="run('selectAll')"><i class="salus-icon-enlarge"></i><span class="item-label">全选</span></li>
                <li (click)="run('paste')" *ngIf = "copyItem"><i class="salus-icon-enlarge"></i><span class="item-label">粘贴</span></li>
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
        z-index: 99999999;
        transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        border-radius: 4px;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        font-stretch: normal;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        line-height: 21px;
        outline: 0;
        list-style-type: none;
        margin: 0;
        text-align: left;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #cfdbe9;
        border-radius: 2px;
        -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.15);
        box-shadow: 0 2px 8px rgba(0,0,0,.15);
        min-width:160px;
        line-height: 28px;
        vertical-align: middle;
    }
    li {
        margin: 0;
        clear: both;
        font-size: 12px;
        font-weight: 400;
        color: #3a3d42;
        white-space: nowrap;
        cursor: pointer;
        -webkit-transition: all .3s;
        transition: all .3s;
        height: 30px;
    }
    .item-label{
        padding-left:16px;
    }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit, OnDestroy {
    private _value: any[];
    type = 0;
    @HostBinding('style.top') top = '-999px';
    @HostBinding('style.left') left = '-999px';
    @HostBinding('style.display') display = 'none';
    cy: any;
    isSelectAll = false;
    copyItem: any[];
    constructor(private el: ElementRef,
        public rd: Renderer2,
        public drgService: ItemDragOverService,
        public change: ChangeDetectorRef) {
    }
    ngOnInit() {
        this.bindEvent();
    }
    bindEvent() {
        if (!this.cy) {
            this.cy = this.drgService.getCY();
        }
        const that = this;
        this.cy.cy.on('cxttap', function (e) {
            const event = e.originalEvent, target = e.target;
            try {
                if (target.is('edge')) {
                    target.select();
                    that.type = 1;
                } else if (target.is('node')) {
                    target.select();
                    that.type = 0;
                }
                that.isSelectAll = false;
                that.cy.cy.elements().unselect();
            } catch (error) {
                that.type = 2;
            }
            that.change.detectChanges();
            that.display = 'block';
            that.left = `${(event.x || event.clientX) + 8}px`, that.top = `${(event.y || event.clentY) + 8}px`;
        });
        this.cy.cy.on('click', function (e) {
            that.isSelectAll = false;
            that.display = 'none';
        });
    }
    run(order: string) {
        this.display = 'none';
        switch (order) {
            case 'copy':
                this.copyItem = this.cy.copy();
                break;
            case 'paste':
                this.cy.paste(this.copyItem);
                break;
            case 'delete':
                this.cy.delete();
                break;
            case 'selectAll':
                this.cy.selectAll();
                this.isSelectAll = true;
                break;
            default:
                break;
        }
    }
    ngOnDestroy() {
        this.copyItem = null;
    }
}
