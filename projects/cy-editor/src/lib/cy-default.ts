import { generateExpandoInstructionBlock } from '@angular/core/src/render3/instructions';
import { isArray } from 'util';

export const defaults = {
    layout: {
        name: 'dagre',
        padding: 80,
        rankDir: 'LR',
        ranker: 'longest-path',
        fit: true,
        rankSep: 100,
        nodeSep: 300
    },
    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#fff',
                'border-color': '#4ea240',
                'border-width': '4',
                shape: 'data(shape)',
                label: 'data(label)',
                width: 80,
                height: 80,
            }
        },
        {
            selector: 'edge',
            style: {
                'opacity': 0.8,
                'line-color': '#4ea240',
                'width': 2,
                'target-arrow-color': '#4ea240',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'control-point-distances': [40, -40],
                'control-point-weights': [0.250, 0.75],
                label: 'data(label)',
            }
        },
        {
            selector: 'node.red',
            style: {
                'background-color': '#fff',
                'border-color': '#c8423a',
                'border-width': '3',
                shape: 'data(shape)',
                label: 'data(label)'
            }
        },
        {
            selector: 'edge.red',
            style: {
                'opacity': 0.8,
                'line-color': '#c8423a',
                'width': 2,
                'target-arrow-color': '#c8423a',
                'target-arrow-shape': 'triangle',
                label: 'data(label)',
            }
        },
        {
            selector: '.multiline-manual',
            style: {
                'text-wrap': 'wrap',
                'text-valign': 'center'
            }
        },
        {
            selector: '.popper',
            style: {
                width: 2,
                height: 2,
                'text-valign': 'center',
                'text-halign': 'center',
                'background-color': '#fff',
                'background-opacity': 0,
                'border-color': '#ccc',
                'border-width': '1',
                'text-max-width': '50px',
                'text-min-width': 20,
                'text-wrap': 'ellipsis',
                'background-fit': 'cover',
                'background-image': '/assets/teste.png',
            }
        },
        {
            selector: '.cat',
            style: {
                'background-image': '/assets/test.png'
            }
        },
        {
            selector: '.mouse',
            style: {
                'background-image': '/assets/test.png'
            }
        },
        {
            selector: '.parentNode',
            style: {
                'min-width-bias-right': '60px',
                'min-width-bias-left': '40px',
            }
        },
        {
            selector: ':parent',
            style: {
                shape: 'ellipse',
                'min-width-bias-left': '40px',
                'min-width': 80,
                'min-height': 80,
                'padding': 2,
            }
        },
        // some style for the extension
        {
          selector: '.eh-handle',
          style: {
            'background-color': 'red',
            'width': 12,
            'height': 12,
            'shape': 'ellipse',
            'overlay-opacity': 0,
            'border-width': 12, // makes the handle easier to hit
            'border-opacity': 0
          }
        },
        {
          selector: '.eh-hover',
          style: {
            'background-color': 'red'
          }
        },
        {
          selector: '.eh-source',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },
        {
          selector: '.eh-target',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },
        {
          selector: '.eh-preview, .eh-ghost-edge',
          style: {
            'background-color': 'red',
            'line-color': 'red',
            'target-arrow-color': 'red',
            'source-arrow-color': 'red'
          }
        },
        {
          selector: '.eh-ghost-edge.eh-preview-active',
          style: {
            'opacity': 0
          }
        },
        {
          selector: ':selected',
          style: {
              'background-color': 'red',

          }
        }
    ],
    // shape === 'rectangle' || shape === 'roundrectangle' || shape === 'cutrectangle' || shape === 'barrel') 
    pan: { x: 0, y: 0 },
    zoomingEnabled: true,
    userZoomingEnabled: true,
    panningEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: true,
    selectionType: 'additive',
    touchTapThreshold: 8,
    desktopTapThreshold: 4,
    autolock: false,
    autoungrabify: false,
    autounselectify: false,
    maxZoom: 10,
    minZoom: 0.1,
    zoom: 1,
    'wheelSensitivity': 0.5
};
const LEFT = 'LEFT', RIGHT = 'RIGHT', TOP = 'TOP', BOTTOM = 'BOTTOM', MIDDLE = 'MIDDLE';
const getPosition = function(x: number, y: number) {
    let w = MIDDLE, h = MIDDLE;
    if (y < 0 && x + y < 0) {
        h = TOP;
    } else if (y > 0 && x + y > 0) {
        h = BOTTOM;
    } else if (x < 0 && x + y < 0) {
        w = LEFT;
    } else if (x > 0 && x + y > 0) {
        w = RIGHT;
    }
    return `${w} ${h}`;
};

export const edgeHandles = {
    handleNodes: ':parent',
    handleInDrawMode: true,
    handlePosition: function( node ){
        // tslint:disable-next-line: deprecation
        const e: any  = event || window.event;
        const position = node.renderedPosition();
        return getPosition(e.offsetX - position.x, e.offsetY - position.y);
    },
    complete: function( sourceNode, targetNode, addedEles ) {
    },
};
export const actions = [
    {
        name: 'add',
        excute: function(cy: any): Function {
            return function(args) {
                return !args.unAction ? cy.add(args) : args.nodes;
            };
        },
        undo: function(cy: any): Function {
            return cy.remove;

        }
    },
    {
        name: 'remove',
        excute: function(cy: any): Function {
            return cy.remove;
        },
        undo: function(cy: any): Function {
            return function(ele) {
                return ele.restore();
            };
        }
    },
    {
        name: 'pan',
        excute: function(cy: any): Function {
            return function(args) {
                if (args.pan) {
                    setTimeout(() => {
                    cy.pan(args.newSpanPosition);
                    });
                }
                return args;
            };
        },
        undo: function(cy: any): Function {
            return function(args) {
                cy.pan(args.originalSpanPosition);
                return Object.assign(args, {pan: true});
            };
        }
    },
    {
        name: 'zoom',
        excute: function(cy: any): Function {
            return function(args) {
                if (args.zoom) {
                    setTimeout(() => {
                    cy.zoom(args.newZoom);
                    cy.center();
                    });
                }
                return args;
            };
        },
        undo: function(cy: any): Function {
            return function(args) {
                cy.zoom(args.originalZoom);
                    cy.center();
                    // cy.pan(args.originalPan);
                return Object.assign(args, {zoom: true});
            };
        }
    },
    {
        name: 'drag',
        excute: function(cy: any): Function {
            return function(args) {
                if (args.move) {
                    moveNodes(args.diff, args.nodes);
                }
                return args;
            };
        },
        undo: function(cy: any): Function {
            return function(args) {
                moveNodes({x: args.diff.x * -1, y: args.diff.y * -1}, args.nodes);
                return {diff: args.diff, nodes: args.nodes, move: true };
            };
        }
    },
];

function getParent(nodes): any[] {
    const nodesMap = {};
    for (let i = 0; i < nodes.length; i++) {
        nodesMap[nodes[i].id()] = true;
    }
    return nodes.filter(function (ele, i) {
        let parent = ele;
        while (parent = parent.parent()[0]) {
            if (nodesMap[parent.id()]) {
                return false;
            }
        }
        return true;
    });
}
function moveNodes (diff, nodes, be = false) {
    const parent = be ? nodes : getParent(nodes);
    for (let i = 0; i < parent.length; i++) {
        const node = parent[i];
        const x = node.position('x') + diff.x;
        const y = node.position('y') + diff.y;
        if (!node.isParent()) {
            node.position({ x, y });
            continue;
        }
        moveNodes(diff, node.children(), true);
    }
}

