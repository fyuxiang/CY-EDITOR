import { TestBed } from '@angular/core/testing';

import { CyEditorService } from './cy-editor.service';

describe('CyEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CyEditorService = TestBed.get(CyEditorService);
    expect(service).toBeTruthy();
  });
});
