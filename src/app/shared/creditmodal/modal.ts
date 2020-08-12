import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title" id="modal-title-default" style="color: #e83a80 !important;">Créditos</h1>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Los créditos te permiten enviar productos a los influencers para conseguir promociones y exponer tu marca delante de una gran audiencia.</p>
    </div>
  </div>
  `
})
export class NgbdModalContent  {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}



