import {actions} from './cy-default';
import { Options } from 'selenium-webdriver/firefox';
import { from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
export class Order {
    private name: string;
    getName() {
        return this.name;
    }
    public excute () {}
    public undo() {}
    constructor(name, excute, undo) {
        this.name = name;
        this.excute = excute;
        this.undo = undo;
    }
}

export class ActionClub {
    cy: any;
    add: Order;
    pan: Order;
    constructor(cy) {
        this.cy = cy;
        actions.map((action) => {
            this.registerAction(action.name, action.excute(this.cy), action.undo(this.cy));
        });
    }
    registerAction(name, excute, undo) {
        this[name] = new Order(name, excute, undo);
    }
}
