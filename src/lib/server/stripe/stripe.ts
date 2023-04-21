import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { STRIPE_PUSBLISHABLE_KEY } from '$env/static/private';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });

  export const createCustomer = async () => {
    const params: Stripe.CustomerCreateParams = {
      description: 'test customer',
    };
  
    const customer: Stripe.Customer = await stripe.customers.create(params);
  
    console.log(customer.id);
  };
  createCustomer();