import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

 function paymentHandle (){

   const stripePromise = loadStripe('pk_test_51Nc23tSAotJqUtGW31r5QvBVGU9BaLzeCjqgq5NAHrNXdUnlUzV7BxcQ6p5ILhNYaHdkiwECX96tV2oH2IlF9dsZ00DVWQGCgp')
  const option ={
    clientSecret :  "clientSecret"
  }
  return(
    <Elements stripe={stripePromise} options={option}>

    </Elements>
  )

  
}

export default paymentHandle



