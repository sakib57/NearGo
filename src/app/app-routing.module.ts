import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'shop-detail/:id', loadChildren: './shop-detail/shop-detail.module#ShopDetailPageModule' },
  { path: 'offer-detail/:id', loadChildren: './offer-detail/offer-detail.module#OfferDetailPageModule' },
  { path: 'event-detail/:id', loadChildren: './event-detail/event-detail.module#EventDetailPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'category-wise/:id', loadChildren: './category-wise/category-wise.module#CategoryWisePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'product-detail/:id', loadChildren: './product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'recharge', loadChildren: './recharge/recharge.module#RechargePageModule' },
  { path: 'order-placed/:id', loadChildren: './order-placed/order-placed.module#OrderPlacedPageModule' },
  { path: 'order-list', loadChildren: './order-list/order-list.module#OrderListPageModule' },
  { path: 'my-payment', loadChildren: './my-payment/my-payment.module#MyPaymentPageModule' },
  { path: 'my-return', loadChildren: './my-return/my-return.module#MyReturnPageModule' },
  { path: 'order-cancel', loadChildren: './order-cancel/order-cancel.module#OrderCancelPageModule' },
  { path: 'reviewall/:id', loadChildren: './reviewall/reviewall.module#ReviewallPageModule' },
  { path: 'reviewadd/:id', loadChildren: './reviewadd/reviewadd.module#ReviewaddPageModule' },
  { path: 'store-wise/:id', loadChildren: './store-wise/store-wise.module#StoreWisePageModule' },
  { path: 'reviewprodall/:id', loadChildren: './reviewprodall/reviewprodall.module#ReviewprodallPageModule' },
  { path: 'reviewprodadd/:id', loadChildren: './reviewprodadd/reviewprodadd.module#ReviewprodaddPageModule' },
  { path: 'my-products', loadChildren: './my-products/my-products.module#MyProductsPageModule' },
  { path: 'trams-conditions', loadChildren: './trams-conditions/trams-conditions.module#TramsConditionsPageModule' },
  { path: 'service-detail/:id', loadChildren: './service-detail/service-detail.module#ServiceDetailPageModule' },
  { path: 'service-booking/:id', loadChildren: './service-booking/service-booking.module#ServiceBookingPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
