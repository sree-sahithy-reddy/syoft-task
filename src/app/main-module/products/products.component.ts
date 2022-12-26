import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
    modalRef!: NgbModalRef;
    description:any;
    productName:any;
    price:any;
    productQuantity!:number;
    searchId:any;
    productId:any;
    productsList:any;
    displayLoader:boolean = true;
    displaySuccess:boolean = false;
    displayFail:boolean = false;
    displayPopupLoader:boolean = false;
    employeeRole:any;
    employeeName:any;

  constructor(private ngbModalService: NgbModal, private service: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.employeeRole = sessionStorage.getItem('role');
    this.employeeName = localStorage.getItem('user');

  }

  getAllProducts() {
    this.service.getAllProducts().subscribe({next: (res:any) => {
        console.log(res)
        this.productsList = res.response;
        this.displayLoader = false;
    },error: (err) => {
        console.log(err);
    }})
  }

  addProduct() {
    this.displaySuccess = false;
    this.displayFail = false;
    this.displayPopupLoader = true;
    let data = {
        productname :this.productName,
        description: this.description,
        count: this.productQuantity,
        price: this.price
    }
   this.service.addProduct(data).subscribe({next: (response) => {
      console.log(response);
      if(response) {
        this.displayPopupLoader = false;
        this.displaySuccess = true;
        this.getAllProducts();
      }
    },error: (error) => {
      console.log(error);
      this.displaySuccess = false;
      this.displayPopupLoader = false;
      this.displayFail = true;
    }});
  }

  async deleteProduct() {
    this.displaySuccess = false;
    this.displayFail = false;
    this.displayPopupLoader = true;
    let data = {
        id:this.productId
    };

    this.service.deleteProduct(data).subscribe({next : (response) => {
      console.log(response);
      if(response) {
        this.displayPopupLoader = false;
        this.displaySuccess = true;
        this.getAllProducts();
      }
    },error : (error) => {
      console.log(error);
      this.displaySuccess = false;
      this.displayPopupLoader = false;
      this.displayFail = true;
    }});
  }

  displayPopupModal(content: any,id:any) {
    this.productId = id;
    this.displaySuccess = false;
    this.displayFail = false;
    this.displayPopupLoader = false;
    this.modalRef = this.ngbModalService.open(content, { centered: true, size: 'md' });
  }

  displayPopupModalAddProducts(content: any) {
    this.displaySuccess = false;
    this.displayFail = false;
    this.displayPopupLoader = false;
    this.modalRef = this.ngbModalService.open(content, { centered: true, size: 'md' });
  }


  cancel() {
    this.modalRef.close();
  }
}
