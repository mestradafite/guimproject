import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-send-product',
  templateUrl: './send-product.component.html',
  styleUrls: ['./send-product.component.css']
})
export class SendProductComponent implements OnInit {
  products: string[] = ["", "", "", "", ""];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
