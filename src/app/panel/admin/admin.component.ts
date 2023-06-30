import { Component, OnInit } from '@angular/core';
import { SericesService } from 'src/app/serices.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private service: SericesService) {}
  productarray: any = [];
  ngOnInit(): void {
    this.service.getallProducts().subscribe((resp: any) => {
      this.productarray = resp?.product;
      console.log(this.productarray);
    });
  }
}
