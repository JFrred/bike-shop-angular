import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/auth.service';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cart.item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isEmpty: boolean = true;
  cart!: Cart;
  items!: CartItem[];
  ids!: number[];

  constructor(public authService: AuthenticationService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCart();
  }

  public getCart(): void {
    this.cartService.get().subscribe(
      (response: Cart) => {
        this.cart = response;
        this.items = response.items;

        if (this.items.length > 0) {
          this.isEmpty = false
        }
        console.log(response);
        console.log("items: " + this.items.length);
      }
    )
  }

  public remove(id: number): void {
    console.log(id);
    this.cartService.remove(id, 1).subscribe();
    this.reloadPage();
  }

  public orderSelected(): void {
    this.ids = this.items.filter(x => x.isSelected).map(item => item.id);
    console.log("ids: " + this.ids);
    const queryParams: any = {};
    queryParams.cartItemIds = JSON.stringify(this.ids);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(['/order-form'], navigationExtras);
  }

  public selectItem(id: number): void {
    let cartItem = this.items.find(x => x.id == id);
    if (cartItem)
      cartItem.isSelected = true;

    console.log(cartItem?.isSelected);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
