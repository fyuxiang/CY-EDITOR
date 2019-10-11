import { Component, OnInit, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  AfterViewInit {
  title = 'ngCytoscape';
  option = {
    elements: [{
      'data': {
          'id': 'first',
          'label': `eeeee`,
          'shape': 'ellipse',
          prop: [{className: 'eee', text: 'test'},{className: 'cat', text: 'testasdasdasasdad'}]
      },
      classes: 'label-top first'
  },
  {
      'data': {
          'id': '2',
          label: 'eee',
          'shape': 'ellipse',
          prop: [{className: 'eee', text: 'test'},{className: 'cat', text: 'testasdasdasasdad'}]
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '3',
          'label': `3`,
          'shape': 'ellipse',
          prop: [{className: 'eee', text: 'test'},{className: 'cat', text: 'testasdasdasasdad'}]
      },
      classes: 'label-top'
  },
  {
      'data': {
          'id': '4',
          label: '4',
          'shape': 'ellipse',
          weight: 23,
          prop: [{className: 'eee', text: 'test'},{className: 'cat', text: 'testasdasdasasdad'}]
      },
      classes: 'red',
  },{
    'data': {
        'id': '5',
        label: '5',
        'shape': 'ellipse',
        weight: 23,
        prop: [{className: 'eee', text: 'test'},{className: 'cat', text: 'testasdasdasasdad'}]
    },
    classes: 'red',
},
{
    'data': {
        'id': '6',
        label: '6',
        'shape': 'ellipse',
        weight: 23,
        prop: [{className: 'eee', text: 'test'},{className: 'cat', text: 'testasdasdasasdad'}]
    },
    classes: 'red',
},
{
    'data': {
        'id': '20',
        label: '20',
        'shape': 'ellipse',
        weight: 23,
    },
    classes: 'red',
},
{
    'data': {
        'id': '21',
        label: '21',
        'shape': 'ellipse',
        weight: 23,
    },
    classes: 'red',
},
{
    'data': {
        'id': '22',
        label: '22',
        'shape': 'ellipse',
        weight: 23,
    },
    classes: 'red',
},
  {
      'data': {
          'id': '7',
          source: 'first',
          target: '2',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '8',
          source: '2',
          target: '3',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '97',
          source: '2',
          target: '4',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '12',
          source: 'first',
          target: '4',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '13',
          source: '4',
          target: '5',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '14',
          source: '4',
          target: '6',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '15',
          source: '6',
          target: '20',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '16',
          source: '20',
          target: '21',
          label: 'ss'
      },
      classes: 'red',
  },
  {
      'data': {
          'id': '17',
          source: '21',
          target: '22',
          label: 'ss'
      },
      classes: 'red',
  }]
  };
  constructor(private render: Renderer2) {}
  ngAfterViewInit() {
  }
}
