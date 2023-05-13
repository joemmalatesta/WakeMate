import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { STRIPE_PUSBLISHABLE_KEY } from '$env/static/private';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

const plans = [
	{
		id: 'Basic',
		name: "Basic Plan",
		price: 500, // Price in cents
	},
	{
		id: 'Pro',
		name: "Pro Plan",
		price: 1000, // Price in cents
	},
	{
		id: 'Family',
		name: "Family Plan",
		price: 2500, // Price in cents
	}
];

// Create the plans in Stripe
async function createPlans(): Promise<void> {
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
async function subscribeCustomer(email: string, planId: string): Promise<void> {
  console.log(email, planId)
  console.log(stripe.plans.retrieve(planId))
  createPlans()

  // const customer = await stripe.customers.create({ email });
  // const subscription = await stripe.subscriptions.create({
  //   customer: customer.id,
  //   items: [{ plan: planId }]
  // });
  // console.log(`Subscribed ${email} to ${planId} plan with subscription id ${subscription.id}`);
}



export {subscribeCustomer}