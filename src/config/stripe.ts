import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
console.log(stripeSecretKey)
export const stripe: Stripe = new Stripe(stripeSecretKey, {

}

);