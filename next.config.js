/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_STRIPE_PUBLIC_KEY: process.env.NEXT_STRIPE_PUBLIC_KEY,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    
  }
}
