// Responsabil strict de comunicarea cu localStorage

export class LocalService {
  constructor() {}

  init() {
    // Initialization
    // let activeCart = JSON.parse(localStorage.getItem('cart'));
    // if (activeCart === null) {
    //   this.cartService.cartActive = [];
    //   return;
    // }
    // if (activeCart.length > 0) this.cartService.cartActive = activeCart;
  }

  getLocalCart() {
    return JSON.parse(localStorage.getItem('cart')) === null
      ? []
      : JSON.parse(localStorage.getItem('cart'));
  }

  setActiveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
