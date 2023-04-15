import { Component, OnInit } from '@angular/core';
import { AcquistoService } from '../../service/acquisto.service';
import { AcquistoLight } from '../../dto/acquisto-light';
import { Constants } from '../../constants/constants';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  acquisti: any[]

  menuOpen = false;

  getDetail(acquisto :any):AcquistoLight{
    return this.as.getDetail(acquisto);
  }

  constructor(private as: AcquistoService) { }

  ngOnInit(): void {
    this.acquisti = []
    
    this.as.sbjObj.asObservable().subscribe(next => {
      this.as.refreshObj(next,Constants.ACQUISTI)
      this.acquisti = next;
    })
  }

  open(){
    this.menuOpen = !this.menuOpen
  }

  close(event:any){
    this.menuOpen = !this.menuOpen
  }

  remove(acquisto: any){
    this.as.remove(acquisto);
  }

}
