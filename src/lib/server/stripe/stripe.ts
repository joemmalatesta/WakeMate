import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { STRIPE_PUSBLISHABLE_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

const plans = [
	{
		id: 'basic-plan',
		name: "Basic Plan",
		price: 500, // Price in cents
	},
	{
		id: 'pro-plan',
		name: "Pro Plan",
		price: 1000, // Price in cents
	},
	{
		id: 'family-plan',
		name: "Family Plan",
		price: 2500, // Price in cents
	}
];

// Create the plans in Stripe
async function createPlans() {
  for (const plan of plans) {
    await stripe.plans.create({
      amount: plan.price,
      interval: "month",
      product: {
        name: plan.name
      },
      currency: 'usd',
      id: plan.id
    });
  }
}

// Subscribe a customer to a plan
async function createCheckout(planId: number) {
  console.log("hitting createCheckout")
  try{
    console.log("trying checkout")
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      success_url: 'https://wakeup.joemmalatesta.com/success',
      cancel_url: 'https://wakeup.joemmalatesta.com/#pricing',
      line_items: [{
        price: plans[planId].id,
        quantity: 1
      }]
    })
    console.log(session.url)
    return {
      url: session.url
    }

  }
  catch (e){
    throw error(500, {
      message: `${e}`
    })
  }
}



export {createCheckout}