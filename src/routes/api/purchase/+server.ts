import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {subscribeCustomer } from '../../../lib/server/stripe/stripe';

export const POST = (async ({ request }) => {
    const { purchaseType } = await request.json();
    console.log(purchaseType)
    subscribeCustomer("joemmalatesta@gmail.com", purchaseType)
    return json(purchaseType)
}) satisfies RequestHandler;