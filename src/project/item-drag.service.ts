import { Injectable, Inject, forwardRef, Optional, ComponentRef, Component } from '@angular/core';
import { CyProComponent } from './cy-property.component';
import { fromEvent, Subscription, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ItemDragOverService {
    private _installed = false;
    private dragover: Subscription;
    private drop: Subscription;
    private _STORE_: Subject<any>;
    p: any;
    UR: any;
    constructor() {
    }
    register(p: any): void;
    register(p: any, fn: Subject<any[]>): any;
    register(p: any, fn?: Subject<any[]>) {
        if (!fn) {
            if (this._installed) { return; }
            this._installed = true;
            this.p = p;
            const el = this.p.el;
            this.dragover = fromEvent(el.nativeElement, 'dragover').subscribe((e: DragEvent) => {
                e.preventDefault();
            });
            this.drop = fromEvent(el.nativeElement, 'drop').subscribe((e: DragEvent) => {
                const data = e.dataTransfer.getData('Text');
                this._STORE_.next([data, e]);
            });
            return;
        }
        this._STORE_ = fn;
        (this._STORE_ as any).id = p;
    }
    getCY() {
        return this.p;
    }
    getUR() {
        return this.p.UR;
    }
    destroy() {
        this._installed = false;
        this.dragover.unsubscribe();
        this.drop.unsubscribe();
    }
}
