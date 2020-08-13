import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  styleUrls: ['./modal.css'],
  template: `
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close mr-1 mt-1" data-dismiss="modal" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">×</span>
      </button>
      <h1 class="modal-title" id="modal-title-default">Créditos</h1>
    </div>
    <div class="modal-body">
      <p>Los créditos te permiten enviar productos a los influencers para conseguir promociones y exponer tu marca delante de una gran audiencia.</p>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-4 mb-5" *ngFor="let availableCredit of availableCredits; let i = index">
            <div class="row d-flex justify-content-center">
              <button class="btn btn-1 btn-primary-principal" type="button">{{availableCredit}} Créditos</button>
            </div>
            <div class="row mt-5 d-flex justify-content-center">
              <img src="../../../assets/img/icons/common/coin.jpg"/>
            </div>
            <div class="row d-flex justify-content-center">
              <span>{{availableCurrency[i]}} €</span>
            </div>
            <div class="row mt-5 d-flex justify-content-center">
              <button class="btn btn-1 btn-primary" type="button">Comprar</button>
            </div>
            <hr class="showOnMobile">
          </div>
        </div>
      </div>
    </div>
  </div>`
})
export class NgbdModalContent  {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}

  private availableCredits: string[] = ["5", "20", "50"];
  private availableCurrency: string[] = ["2,99", "4,99", "9,99"];
}



