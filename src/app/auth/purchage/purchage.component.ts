import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SericesService } from 'src/app/serices.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-purchage',
  templateUrl: './purchage.component.html',
  styleUrls: ['./purchage.component.css'],
})
export class PurchageComponent implements OnInit {
  productsArray: any[];
  userIds: string;
  prdids: string;
  addressform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: SericesService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.getIdFromToken();
    // this.productbuy();
    this.addressform = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      addresss: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      productID: [null, [Validators.required]],
      userID: [this.userIds, [Validators.required]],
    });
    console.log(this.addressform);

    this.activatedRoute.params.subscribe((params: any) => {
      const producDAta = params.productId;
      this.service.productWithId(producDAta).subscribe((resp: any) => {
        console.log('alll', resp.product._id);
        this.productsArray = [resp.product];
        this.prdids = resp.product._id;
        this.addressform.patchValue({ productID: this.prdids });
        this.productbuy(resp);
        console.log('ProductIddd', this.prdids);
      });
    });
    console.log('User ID:', this.userIds);
  }
  getIdFromToken() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const decodedToken: any = jwt_decode(accessToken);
      this.userIds = decodedToken.id;
      // console.log('User ID:', this.userIds);
    }
  }

  productbuy(data: any) {
    this.prdids = data;
    console.log('Prddiddddd', data);
  }

  purchage() {
    this.service.purchageorder(this.addressform.value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.toaster.success('Purchase successFull');
      },
      (error: any) => {
        this.toaster.error(error.error.message);
      }
    );
  }
}
