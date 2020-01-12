import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-payment',
  templateUrl: './my-payment.page.html',
  styleUrls: ['./my-payment.page.scss'],
})
export class MyPaymentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  recharge(){
    // var options = {
    //   description: 'Credits towards consultation',
    //   image: 'https://i.imgur.com/3g7nmJC.png',
    //   currency: 'INR',
    //   key: 'rzp_test_1DP5mmOlF5G5ag',
    //   order_id: 'order_7HtFNLS98dSj8x',
    //   amount: '5000',
    //   name: 'foo',
    //   prefill: {
    //     email: 'pranav@razorpay.com',
    //     contact: '8879524924',
    //     name: 'Pranav Gupta'
    //   },
    //   theme: {
    //     color: '#F37254'
    //   }
    // }
    
    // var successCallback = function(success) {
    //   alert('payment_id: ' + success.razorpay_payment_id)
    //   var orderId = success.razorpay_order_id
    //   var signature = success.razorpay_signature
    // }
    
    // var cancelCallback = function(error) {
    //   alert(error.description + ' (Error '+error.code+')')
    // }
    
    // RazorpayCheckout.on('payment.success', successCallback)
    // RazorpayCheckout.on('payment.cancel', cancelCallback)
    // RazorpayCheckout.open(options)
  }

  

}
