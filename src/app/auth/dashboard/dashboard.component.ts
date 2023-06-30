import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { Location } from '@angular/common';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SericesService } from 'src/app/serices.service';
// import * as jwt_decode from 'jsonwebtoken';
// import jwt_decode from 'jwt-decode';
//
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  imagePreview: string | null = null;
  selectedImage: File | null = null;

  constructor(
    private service: SericesService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activRoutes: ActivatedRoute,
    private location: Location
  ) {}
  productarray: any;

  images: string[] = [];
  submitFlag: boolean = false;

  imageUrl: string | null = null;
  accessToken: string | null;
  invoiceId: any;
  role: any;
  invoiceArrayAdim: any;
  isAdmin: any;
  isManager: any;
  productForm: FormGroup;
  prdId: any;
  formId: any;
  invoiceArray: any = [];
  ngOnInit(): void {
    this.getAllProducts();
    this.productForm = this.formBuilder.group({
      productname: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      // image: this.formBuilder.array([]),

      seriesnumber: [''],
      quantity: [''],
    });
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    this.activRoutes.params.subscribe((respId: any) => {
      this.invoiceId = respId;
    });

    this.getInvoices();
    this.getUserDetails();
    // this.addproducts();
    this.allInvoiceAdmin();
  }
  getAllProducts() {
    this.service.getallProducts().subscribe((resp: any) => {
      this.productarray = resp?.product;

      console.log('product', this.productarray);
    });
  }

  getUserDetails() {
    this.service.getUsersProfile(this.invoiceId.id).subscribe((resp: any) => {
      this.isAdmin = resp.role;
      console.log('a', this.isAdmin);
    });
  }
  UpdtesData(data: any) {
    // this.submitFlag = true;
    this.formId = data;
    console.log('formiddd', this.formId);

    const selectedProduct = this.productarray.find(
      (product: any) => product._id === this.formId
    );
    // const selectedProduct = this.productarray[this.formId];
    // this.productForm.reset();

    this.productForm.patchValue({
      productname: selectedProduct.productname,
      description: selectedProduct.description,
      price: selectedProduct.price,
      seriesnumber: selectedProduct.seriesnumber,
      quantity: selectedProduct.quantity,
    });
    // console.log(selectedProduct);

    this.imagePreview = selectedProduct.image;
  }
  editProduct() {
    this.productForm.get('image')?.setValue(this.imagePreview);
    // this.submitFlag = true;
    let formData = new FormData();
    formData.append('productname', this.productForm.get('productname')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append(
      'seriesnumber',
      this.productForm.get('seriesnumber')?.value
    );
    formData.append('quantity', this.productForm.get('quantity')?.value);

    if (this.imagePreview) {
      formData.append('image', this.imagePreview);
    }

    console.log('formData', formData);

    this.service
      .updatesDetails(this.formId, formData)
      .subscribe((resp: any) => {
        console.log(resp);
        this.toaster.success('Update Successful');
        this.getAllProducts();
      });
  }

  getInvoices() {
    console.log(this.invoiceId);
    this.service.invoiceDetails(this.invoiceId.id).subscribe((resp: any) => {
      if (resp) {
        this.invoiceArray = [resp.purchases];

        console.log('invoicess', this.invoiceArray);
        // console.log('aaaa', resp.purchases[0].city);
      }
    });
  }
  addproducts() {
    let formData = new FormData();
    formData.append('productname', this.productForm.get('productname')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append(
      'seriesnumber',
      this.productForm.get('seriesnumber')?.value
    );
    formData.append('quantity', this.productForm.get('quantity')?.value);
    formData.append('image', this.productForm.get('image')?.value);

    this.service.addProducts(formData).subscribe(
      (resp: any) => {
        if (resp) {
          console.log('resss', resp);
          this.toaster.success(resp.message);
        }
        this.getAllProducts();
      },

      (error) => {
        this.toaster.error(error.error.message);
      }
    );
  }

  selectImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.productForm.controls['image'].setValue(reader.result);
        };
      }
    });
    fileInput.click();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image')?.setValue(file);
    }
  }

  onSubmit() {
    // this.addproducts();
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    }
  }
  nextPagePurchage(productId: any) {
    console.log('vvvvvv', productId);
    this.router.navigate(['/auth/purchage', productId]);
  }

  deleteProduct(data: any) {
    this.service.deletdProducts(data).subscribe((resp: any) => {
      this.toaster.success('Deleted Products SccessFUll');
      this.getAllProducts();
    });
  }

  allInvoiceAdmin() {
    this.service.invoiceAdmine().subscribe((resp: any) => {
      this.invoiceArrayAdim = resp.purchages;
      console.log('aaaaaaaaaa', resp);
    });
  }
  onRest() {
    this.productForm.reset();
    this.formId = null;
    this.imagePreview = null;
  }
}
