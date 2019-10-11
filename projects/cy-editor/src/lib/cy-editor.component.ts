/**
 * TODO @fengyuxiang  放大缩小的画布
 */
import { Component, OnInit, AfterViewInit, ElementRef, Input, Renderer2, InjectionToken, forwardRef, ViewChild, ViewContainerRef } from '@angular/core';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import { domRendererFactory3 } from '@angular/core/src/render3/interfaces/renderer';
import dagre from 'cytoscape-dagre';
import { ToolTipComponent } from './cy-tooltip.component';
import { ItemDragOverService } from './item-drag.service';
import edgehandles from 'cytoscape-edgehandles';
import { defaults, edgeHandles } from './cy-default';
import { reoUndo } from './undo-redo';

cytoscape.use(dagre);
cytoscape.use(popper);
cytoscape.use(edgehandles);
cytoscape.use(reoUndo);
const baseRender = cytoscape('renderer', 'base'),
    getShape = baseRender.prototype.getNodeShape,
    canvas = cytoscape('renderer', 'canvas');
baseRender.prototype.getNodeShape = function (node) {
    let shape = getShape.call(this, node);
    if (node.isParent()) {
        shape = 'ellipse';
    }
    return shape;
};
cytoscape('renderer', 'base', baseRender);
canvas.prototype.getNodeShape = baseRender.prototype.getNodeShape;
export const CYTOSCAPE = new InjectionToken('cytoscape');

@Component({
    selector: 'lib-cy-editor',
    template: `<app-tb></app-tb><div id='cy' #el></div><app-tooltip></app-tooltip><lib-context-menu></lib-context-menu>`,
    styles: [`
        :host #cy{
        width: 900px;
        height: 600px;
        display: block;
        position: absolute;
        top: 50px;
      }
       .popper-div{
        font-size:12px;
        transform: scale(1);
        }
    `],
})
export class CyEditorComponent implements OnInit {
    @Input() option: any;
    cy: any;
    UR: any;
    orignalOption: any;
    popperCollection: any = {};
    @ViewChild('el') el: ElementRef;
    @ViewChild(ToolTipComponent) tooltip = ToolTipComponent;
    values = [];
    get BoundingClientRect() {
        return this.el.nativeElement.getBoundingClientRect();
    }
    constructor(
        public rd: Renderer2,
        public dragService: ItemDragOverService,
    ) {
    }
    /**
     *
     */
    resovle(node: any, prop: any[]) {
        // const that = this;
        // const makeDiv = function (thtml) {
        //     const div = that.rd.createElement('div'),
        //         innerDiv = that.rd.createElement('div');
        //     innerDiv.classList.add('popper-div');
        //     that.rd.appendChild(innerDiv, thtml);
        //     that.rd.appendChild(div, innerDiv);
        //     that.rd.appendChild(document.body, div);
        //     return div;
        // };
        // const popperA = this.popperCollection[node.id()] = node.popper({
        //     content: function () { return makeDiv(html); }
        // });
        // const rect = this.BoundingClientRect;
        // const updateA = function () {
        //     popperA.scheduleUpdate();
        //     that.resolvePosition(popperA, rect);
        // };
        // node.on('position', updateA);
        // this.cy.on('pan zoom resize', updateA);
        node.toggleClass('parentNode');
        this.cy.add(this.generateNode(prop, node));
    }
    generateNode(prop: any[], node) {
        const position = node.position(), width = node.width(), height = node.height();
        return prop.map((e, index) => {
            return {
                data: { label: e.text, parent: node.id() },
                position: { x: position.x - width, y: position.y + height * 0.3 * index },
                classes: 'popper ' + e.className,
                grabbable: false,
                selectable: false,
            };
        });
    }
    getRenderedCenter(target) {
        console.log(target.renderedPosition(), target.renderedWidth());
    }
    /**
     *
     */
    resolvePosition(node, rect) {
        const height = node.reference.clientHeight;
        node.popper.style.marginTop = `-${height}px`;
        let scale = 1, fontSize = height / 8;
        if (height < 100) {
            scale = height / 96;
            fontSize = 12;
        }
        node.popper.querySelector('div.popper-div').style.transform = `scale(${scale})`;
        node.popper.querySelector('div.popper-div').style.fontSize = `${fontSize}px`;
    }
    ngOnInit() {
        const opt = this.orignalOption = Object.assign({}, defaults, {
            container: this.el.nativeElement, ...this.option
        });
        this.reset(opt);
        this.dragService.register(this);
    }
    /**
     *
     */
    public enlarge() {
        const zoom = this.cy.zoom();
        this.UR.do('zoom', {newZoom: zoom * 1.25, originalZoom: zoom, zoom: true});
        this.cy.center();
    }
    /**
     *
     */
    public shrink() {
        const zoom = this.cy.zoom();
        this.UR.do('zoom', {newZoom: zoom * 0.8, originalZoom: zoom, zoom: true});
        this.cy.center();
    }
    /**
     *
     */
    public addGroup(eles: any[]) {
        this.cy.add(eles);
        eles.map((ele) => {
            const prop = ele.data.prop;
            if (!prop || prop.length === 0) {
                return;
            }
            const dom = this.cy.getElementById(ele.data.id);
            dom.addClass('parentNode');
            this.cy.add(this.generateNode(ele.data.prop, dom));
        });
    }
    /**
     *
     */
    public add(eles: any[]) {
        this.UR.do('add', eles);

    }
    /**
     *
     */
    public remove(st: string[]) {
        st.forEach((e) => {
            const remove = this.cy.elements(e);
            // this.popperCollection[remove.id()].popper.remove();
            remove.remove();
        });
    }
    /**
     *
     */
    public destroy() {
        if (this.cy) {
            this.dragService.destroy();
            this.cy.destroy();
        }
        // Object.values(this.popperCollection).forEach((pop: any) => {
        //     pop.popper.remove();
        // });
    }
    /**
     *
     */
    public reset(opt?: any) {
        this.destroy();
        this.cy = cytoscape(opt || this.orignalOption);
        this.option.elements.map((node: any) => {
            if (node.data.prop) {
                const dom = this.cy.getElementById(node.data.id);
                this.resovle(dom, node.data.prop);
            }
        });
        const eh = this.cy.edgehandles(Object.assign(edgeHandles, {complete: this.lineComplete.bind(this)}));
        this.UR = this.cy.undoRedo({});
    }
    lineComplete(...args: any[]) {
        const edge = args[2];
        this.UR.do('add', {nodes: edge, unAction: true});
    }
    public fit() {
        this.cy.fit();
    }
    public undo() {
        this.UR.undo();
    }
    public redo() {
        this.UR.redo();
    }
    public copy(ele?: any[]) {
        return this.cy.$('node:selected').clone();
    }
    public paste(ele?: any[]) {
        this.add((ele || this.copy()).forEach((node) => {
            node.data().id = `clone_${node.id()}`;
        }));
    }
    public selectAll() {
        this.cy.elements().select();
    }
    public delete() {
        this.UR.do('remove', this.cy.$(':selected'));
    }
    public select() {
        this.cy.userPanningEnabled(false);
        this.cy.boxSelectionEnabled(true);
    }
    public pan() {
        this.cy.autolock( true );
        this.cy.userPanningEnabled(true);
    }
}
