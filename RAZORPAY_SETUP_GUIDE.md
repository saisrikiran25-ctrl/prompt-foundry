# Razorpay Integration Guide for PromptFoundry

This guide will help you set up Razorpay as your payment gateway for PromptFoundry.

## Prerequisites

1. A Razorpay account (Sign up at https://razorpay.com)
2. Access to Razorpay Dashboard
3. Your Razorpay API credentials

## Step 1: Create a Razorpay Account

1. Go to https://razorpay.com
2. Click on "Sign Up" and create your account
3. Complete the verification process
4. Log in to the Razorpay Dashboard

## Step 2: Get Your API Keys

### For Testing (Development)
1. Log in to your Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Under "Test Mode", click on **Generate Test Key**
4. You will see:
   - **Key ID**: Starts with `rzp_test_`
   - **Key Secret**: Keep this confidential

### For Production (Live Payments)
1. Complete your KYC (Know Your Customer) verification
2. Once approved, navigate to **Settings** → **API Keys**
3. Switch to "Live Mode"
4. Click **Generate Live Key**
5. You will see:
   - **Key ID**: Starts with `rzp_live_`
   - **Key Secret**: Keep this extremely confidential

## Step 3: Configure Your Application

### Option 1: Environment Variables (Recommended)
Create a `.env.local` file in the root directory:

```env
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
```

### Option 2: Direct Configuration
Edit the file `components/RazorpayPaymentForm.tsx`:

```typescript
const RAZORPAY_CONFIG = {
  keyId: 'rzp_test_YOUR_KEY_ID', // Replace with your actual Key ID
  keySecret: '', // Never expose this in frontend
};
```

**Important**: The Key Secret should ONLY be used on your backend server for payment verification. Never expose it in frontend code.

## Step 4: Backend Integration (Required for Production)

For production use, you MUST implement a backend to:

1. **Create Razorpay Orders**: 
   - Endpoint: `/api/create-razorpay-order`
   - This prevents amount manipulation from the frontend

2. **Verify Payment Signatures**:
   - Endpoint: `/api/verify-razorpay-payment`
   - This ensures the payment is genuine and not tampered with

### Sample Backend (Node.js/Express)

```javascript
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
app.post('/api/create-razorpay-order', async (req, res) => {
  const { amount, currency } = req.body;
  
  try {
    const order = await razorpay.orders.create({
      amount: amount, // amount in paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify Payment
app.post('/api/verify-razorpay-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest('hex');
  
  if (razorpay_signature === expectedSign) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure' });
  }
});
```

## Step 5: Update Frontend Code

Uncomment the backend API calls in `components/RazorpayPaymentForm.tsx`:

1. In `initiatePayment` function:
```typescript
// Replace the simulation with:
const response = await fetch('/api/create-razorpay-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: total * 100, currency: 'INR' })
});
const orderData = await response.json();
```

2. In `handlePaymentSuccess` function:
```typescript
// Replace the simulation with:
const verification = await fetch('/api/verify-razorpay-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
  })
});
```

## Step 6: Testing Your Integration

### Test Mode
1. Use your test API keys
2. Use Razorpay test cards:
   - **Success**: `4111 1111 1111 1111`
   - **Failure**: `4111 1111 1111 1234`
   - CVV: Any 3 digits
   - Expiry: Any future date

### Test UPI
- Use any VPA ending with `@razorpay`
- Example: `test@razorpay`

### Testing Flow
1. Add items to cart
2. Go to checkout
3. Click "Pay with Razorpay"
4. Razorpay modal will open
5. Select payment method (Card/UPI/Netbanking)
6. Complete the test payment
7. Verify order appears in Dashboard

## Step 7: Going Live

1. Complete KYC verification on Razorpay Dashboard
2. Generate Live API keys
3. Update your environment variables with live keys:
```env
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```
4. Deploy your backend with proper security
5. Test with a small real transaction
6. Monitor the Razorpay Dashboard for settlements

## Payment Features Supported

- ✅ Credit/Debit Cards
- ✅ UPI (GPay, PhonePe, Paytm, etc.)
- ✅ Net Banking
- ✅ Wallets (Paytm, PhonePe, etc.)
- ✅ EMI
- ✅ International Cards (if enabled)

## Security Best Practices

1. **Never expose Key Secret in frontend code**
2. **Always verify payment signature on backend**
3. **Use HTTPS in production**
4. **Implement rate limiting on your API endpoints**
5. **Store API keys in environment variables**
6. **Enable webhooks for payment notifications**
7. **Implement proper error handling**

## Webhooks (Optional but Recommended)

Configure webhooks to get real-time payment updates:

1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/razorpay-webhook`
3. Select events: `payment.captured`, `payment.failed`, `order.paid`
4. Verify webhook signatures in your backend

## Troubleshooting

### Payment Modal Not Opening
- Check if Razorpay SDK loaded: Open browser console
- Verify Key ID is correct
- Check browser console for errors

### Payment Failing
- Verify amount is in paise (multiply by 100)
- Check if test/live mode matches your keys
- Ensure order creation is successful

### Amount Mismatch
- Remember: Razorpay expects amount in paise (₹100 = 10000 paise)
- Always multiply rupee amount by 100

### Verification Failing
- Check Key Secret is correct on backend
- Verify signature generation logic
- Ensure all three parameters are being sent

## Support Resources

- Razorpay Documentation: https://razorpay.com/docs/
- Integration Guides: https://razorpay.com/docs/payments/
- API Reference: https://razorpay.com/docs/api/
- Support: https://razorpay.com/support/

## Migration Complete

Your PromptFoundry application now uses Razorpay for payment processing:
- ✅ Express UPI removed
- ✅ Zapier integration removed  
- ✅ Razorpay checkout integrated
- ✅ Support for all major payment methods
- ✅ Secure payment workflow

## Next Steps

1. Set up your backend API endpoints
2. Test thoroughly in test mode
3. Complete KYC verification
4. Switch to live mode
5. Start accepting real payments!

For any issues or questions, refer to Razorpay's extensive documentation or contact their support team.
