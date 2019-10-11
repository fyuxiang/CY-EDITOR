import { Injectable } from '@angular/core';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { reoUndo } from './undo-redo';
import edgehandles from 'cytoscape-edgehandles';
function initExtentions() {
  cytoscape.use(dagre);
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
}
@Injectable({
  providedIn: 'root'
})
export class CyEditorService {

  constructor() {
    initExtentions();
  }
  getFactory() {
    return cytoscape;
  }
}
