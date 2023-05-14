import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {createCheckout } from '../../../lib/server/stripe/stripe';

export const POST = (async ({ request }) => {
    const { purchaseId } = await request.json();
    console.log(purchaseId)
    const url = await createCheckout(purchaseId)
    return json(url)
}) satisfies RequestHandler;