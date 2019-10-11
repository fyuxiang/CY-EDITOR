import { ActionClub } from './action';
import { from, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

class Store {
    private _store_: Map<string, any> = new Map();
    get(name: string) {
        return this._store_.get(name);
    }
    set(name: string, obj) {
        this._store_.set(name, obj);
    }
}
class Stack {
    protected stack = [];
    protected sizeLimit = 20;
    private _length = 0;
    public get length() {
        return this.stack.length;
    }
    public getStack() {
        return this.stack;
    }
    public pushStack(item) {
        this.stack.push(item);
    }
    public clearStack() {
        return this.stack = [];
    }
    public setSizeLimit(n: number) {
        this.sizeLimit = n;
    }
    public getSizeLimit(n: number) {
        return n;
    }
    constructor(size) {
        this.setSizeLimit(size);
    }
}
class Config {
    protected undoStack: Stack;
    protected redoStack: Stack;
    protected sizeLimit = 20;
    protected beforeExcute(action, args) {
    }
    protected afterExcute(action, args) {
    }
    protected ready() {
    }
    constructor(opt) {
        for (const i in opt) {
            if (this.get(i)) {
                this.set(i, opt[i]);
            }
        }
        this.undoStack = new Stack(this.sizeLimit);
        this.redoStack = new Stack(this.sizeLimit);
    }
    set(name, config) {
        Object.defineProperty(this, name, {
            value: config,
            enumerable: false,
            configurable: false
        });
    }
    get(name) {
        return Object.getOwnPropertyDescriptor(this, name).value;
    }
}

class RedoUndo extends Config {
    public cy: any;
    public store = new Store();
    public action: ActionClub;
    constructor(cy, opt) {
        super(opt);
        this.cy = cy;
        this.action = new ActionClub(this.cy);
        this.initEvent(opt);
    }
    redo() {
        if (!this.redoStack.length) {
            return;
        }
        const action = this.redoStack.getStack().pop();
        const args = this.action[action.order].excute(action.args);
        this.undoStack.pushStack({
            order: action.order,
            args
        });
    }
    undo() {
        if (!this.undoStack.length) {
            return;
        }
        const action = this.undoStack.getStack().pop();
        const args = this.action[action.order].undo(action.args);
        this.redoStack.pushStack({
            order: action.order,
            args
        });
    }
    do(order, args) {
        this.redoStack.clearStack();
        this.redoStack.pushStack({
            order,
            args,
        });
        this.redo();
    }
    initEvent(opt) {
        if (opt.openPan || true) {
            this.panEmitter();
        }
        if (opt.openZoom || true) {
            this.zoomEmitter();
        }
        if (opt.openDrag || true) {
            this.dragEmitter();
        }
    }
    panEmitter() {
        let originalSpanPosition = this.copy(this.cy.pan());
        let newSpanPosition = this.copy(this.cy.pan());
        const that = this; let isdraging = false;
        Observable.create(function (ob) {
            that.cy.on('mousedown', function () {
                isdraging = true;
            });
            that.cy.on('mouseup', function () {
                isdraging = false;
            });
            that.cy.on('pan', function () {
                if (!isdraging) { return; }
                ob.next(that.cy.pan());
            });
        }).pipe(debounceTime(1000)).subscribe((pan) => {
            newSpanPosition = this.copy(pan);
            that.do('pan', { originalSpanPosition, newSpanPosition, pan: false });
            originalSpanPosition = newSpanPosition;
        });
    }
    zoomEmitter() {
        let originalZoom = this.cy.zoom(), originalPan = this.cy.pan();
        let newZoom = originalZoom, newPan = originalPan;
        const that = this;
        let isZooming = false;
        Observable.create(function (ob) {
            fromEvent(document, 'mousewheel').subscribe((e) => {
                const target = e.target;
                if ((target as any).tagName.toLowerCase() === 'canvas') {
                    ob.next([that.cy.zoom(), that.cy.pan()]);
                }
            });
        }).pipe(debounceTime(1000)).subscribe((zoom) => {
            isZooming = false;
            newZoom = this.copy(zoom[0]);
            newPan = this.copy(zoom[1]);
            that.do('zoom', { originalZoom, newZoom, originalPan, newPan, pan: false });
            originalZoom = newZoom;
            originalPan = newPan;
        });
    }
    dragEmitter() {
        const that = this;
        let lastMouseDownNodeInfo: any;
        this.cy.on('grab', 'node', function () {
            lastMouseDownNodeInfo = {};
            lastMouseDownNodeInfo.position = {
                x: this.position('x'),
                y: this.position('y')
            };
            lastMouseDownNodeInfo.node = this;
        });
        this.cy.on('free', 'node', function () {
            if (!lastMouseDownNodeInfo) {
                return;
            }
            const node = lastMouseDownNodeInfo.node;
            const position = lastMouseDownNodeInfo.position;
            const diff = {
                x: node.position('x') - position.x,
                y: node.position('y') - position.y
            };
            let nodes;
            if (node.selected()) {
                nodes = that.cy.nodes(':visible').filter(':selected');
            } else {
                nodes = that.cy.collection([node]);
            }
            const param = {
                diff, nodes, move: false
            };
            that.do('drag', param);
            lastMouseDownNodeInfo = null;
        });
    }
    copy(o) {
        return JSON.parse(JSON.stringify(o));
    }
}


export function reoUndo(cytoscape) {

    if (!cytoscape) {
        return;
    }
    cytoscape('core', 'undoRedo', function (ops) {
        const cy = this;
        const store = new Store();
        const ins = store.get('instance') || new RedoUndo(cy, ops);
        store.set('instance', ins);
        ins.ready();
        return ins;
    });
}

