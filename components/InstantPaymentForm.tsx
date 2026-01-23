
import React, { useState } from 'react';
import { CreditCard, Smartphone, QrCode, Link2, CheckCircle, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { db } from '../services/database';
import { useNavigate } from 'react-router-dom';

// INSTANT PAYMENT OPTIONS - NO ACCOUNT SETUP REQUIRED
// These work immediately and you receive payments directly to your accounts

const PAYMENT_CONFIG = {
  // Option 1: Direct UPI - Customers pay to your UPI ID
  upiId: 'yourname@paytm', // REPLACE with your actual UPI ID (e.g., 9876543210@paytm, yourname@ybl, etc.)
  
  // Option 2: PayPal - Accept payments worldwide
  paypalEmail: 'your-paypal@email.com', // REPLACE with your PayPal email
  paypalMeLink: 'https://paypal.me/yourname', // REPLACE with your PayPal.Me link
  
  // Option 3: Bank Transfer Details (shown to customer after order)
  bankDetails: {
    accountName: 'Your Business Name',
    accountNumber: 'XXXX-XXXX-XXXX',
    ifscCode: 'XXXX0000XXX',
    bankName: 'Your Bank Name',
    branch: 'Your Branch'
  },
  
  // Option 4: Cryptocurrency (Bitcoin, USDT, etc.)
  cryptoAddresses: {
    bitcoin: 'your-btc-address', // REPLACE with your BTC wallet
    ethereum: 'your-eth-address', // REPLACE with your ETH wallet
    usdt: 'your-usdt-address' // REPLACE with your USDT wallet (TRC20/ERC20)
  }
};

type PaymentMethod = 'upi' | 'paypal' | 'bank' | 'crypto';
type PaymentStatus = 'idle' | 'selecting' | 'processing' | 'awaiting_confirmation' | 'completed';

export const InstantPaymentForm: React.FC = () => {
  const { total, clearCart, items } = useCart();
  const { user, refreshUserData } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentProof, setPaymentProof] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  
  const generateOrderId = () => `PF-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStatus('processing');
  };

  const handlePaymentComplete = async () => {
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }

    // Validate that user has entered transaction details
    if (!transactionId.trim()) {
      showToast("Please enter your transaction/payment ID", "error");
      return;
    }

    setStatus('awaiting_confirmation');

    try {
      // Create order with pending status
      // In a real scenario, you would:
      // 1. Upload payment proof to cloud storage
      // 2. Send notification to admin for verification
      // 3. Update order status after manual verification
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (user) {
        // Record Order with payment details
        await db.orders.create(user.uid, items, total);
        await refreshUserData();
        clearCart();
        setStatus('completed');
        showToast("Order placed! We'll verify your payment and grant access within 24 hours.", "success");
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 4000);
      }
    } catch (error) {
      console.error("Order creation error", error);
      showToast("Failed to place order. Please contact support.", "error");
      setStatus('processing');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, "success");
  };

  if (status === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h2>
        <p className="text-textSecondary mb-4 max-w-md">
          We've received your order. Your payment will be verified within 24 hours, and you'll receive an email once your purchase is ready.
        </p>
        <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-white/5 text-sm font-mono text-accent">
          Redirecting to Dashboard...
        </div>
      </div>
    );
  }

  if (status === 'processing' && selectedMethod === 'upi') {
    // Generate UPI payment string
    const upiString = `upi://pay?pa=${PAYMENT_CONFIG.upiId}&pn=PromptFoundry&am=${total.toFixed(2)}&cu=INR&tn=Order-${generateOrderId()}`;
    
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-primary/50 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Smartphone className="text-accent" /> Pay via UPI
          </h3>
          
          {/* QR Code */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-retro rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white p-4 rounded-xl">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`}
                  alt="UPI Payment QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
            <p className="text-white font-bold text-2xl mt-4">₹{total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-textSecondary mt-2">Scan with any UPI app</p>
          </div>

          {/* UPI ID */}
          <div className="bg-secondary/50 rounded-lg border border-white/5 p-4 mb-4">
            <label className="text-xs text-textSecondary mb-2 block">Pay to UPI ID:</label>
            <div className="flex items-center justify-between">
              <span className="text-white font-mono text-sm">{PAYMENT_CONFIG.upiId}</span>
              <button 
                onClick={() => copyToClipboard(PAYMENT_CONFIG.upiId, 'UPI ID')}
                className="text-accent hover:text-accent/80 p-2"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="text-xs text-textSecondary">OR</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Open in UPI App */}
          <a 
            href={upiString}
            className="w-full rounded-lg bg-accent/10 border border-accent/30 py-3 font-bold text-accent hover:bg-accent/20 transition-all flex items-center justify-center gap-2 mb-6"
          >
            <Smartphone size={18} /> Open in UPI App
          </a>

          {/* After Payment */}
          <div className="border-t border-white/10 pt-4">
            <label className="text-sm text-white mb-2 block">After completing payment, enter your UPI Transaction ID:</label>
            <input 
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g., 403993715896"
              className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-textSecondary focus:border-accent focus:outline-none mb-4"
            />
            <button 
              onClick={handlePaymentComplete}
              className="w-full rounded-lg bg-accent py-3 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all"
            >
              Confirm Payment
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => { setStatus('idle'); setSelectedMethod(null); }}
          className="text-textSecondary hover:text-white text-sm"
        >
          ← Choose different payment method
        </button>
      </div>
    );
  }

  if (status === 'processing' && selectedMethod === 'paypal') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-primary/50 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ExternalLink className="text-accent" /> Pay via PayPal
          </h3>
          
          <div className="bg-secondary/50 rounded-lg border border-white/5 p-6 text-center mb-6">
            <p className="text-white font-bold text-2xl mb-2">₹{total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-textSecondary">Amount to send via PayPal</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-secondary/50 rounded-lg border border-white/5 p-4">
              <label className="text-xs text-textSecondary mb-2 block">Send money to:</label>
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-sm">{PAYMENT_CONFIG.paypalEmail}</span>
                <button 
                  onClick={() => copyToClipboard(PAYMENT_CONFIG.paypalEmail, 'PayPal Email')}
                  className="text-accent hover:text-accent/80 p-2"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {PAYMENT_CONFIG.paypalMeLink && (
              <a 
                href={PAYMENT_CONFIG.paypalMeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} /> Open PayPal.Me
              </a>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <label className="text-sm text-white mb-2 block">After completing payment, enter your PayPal Transaction ID:</label>
            <input 
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g., 8AB12345CD678901E"
              className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-textSecondary focus:border-accent focus:outline-none mb-4"
            />
            <button 
              onClick={handlePaymentComplete}
              className="w-full rounded-lg bg-accent py-3 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all"
            >
              Confirm Payment
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => { setStatus('idle'); setSelectedMethod(null); }}
          className="text-textSecondary hover:text-white text-sm"
        >
          ← Choose different payment method
        </button>
      </div>
    );
  }

  if (status === 'processing' && selectedMethod === 'bank') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-primary/50 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="text-accent" /> Bank Transfer Details
          </h3>
          
          <div className="bg-secondary/50 rounded-lg border border-white/5 p-6 text-center mb-6">
            <p className="text-white font-bold text-2xl mb-2">₹{total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-textSecondary">Amount to transfer</p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { label: 'Account Name', value: PAYMENT_CONFIG.bankDetails.accountName },
              { label: 'Account Number', value: PAYMENT_CONFIG.bankDetails.accountNumber },
              { label: 'IFSC Code', value: PAYMENT_CONFIG.bankDetails.ifscCode },
              { label: 'Bank Name', value: PAYMENT_CONFIG.bankDetails.bankName },
              { label: 'Branch', value: PAYMENT_CONFIG.bankDetails.branch },
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary/50 rounded-lg border border-white/5 p-4">
                <label className="text-xs text-textSecondary mb-1 block">{item.label}:</label>
                <div className="flex items-center justify-between">
                  <span className="text-white font-mono text-sm">{item.value}</span>
                  <button 
                    onClick={() => copyToClipboard(item.value, item.label)}
                    className="text-accent hover:text-accent/80 p-2"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4">
            <label className="text-sm text-white mb-2 block">After completing transfer, enter your Transaction/UTR Number:</label>
            <input 
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g., UTR123456789012"
              className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-textSecondary focus:border-accent focus:outline-none mb-4"
            />
            <button 
              onClick={handlePaymentComplete}
              className="w-full rounded-lg bg-accent py-3 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all"
            >
              Confirm Payment
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => { setStatus('idle'); setSelectedMethod(null); }}
          className="text-textSecondary hover:text-white text-sm"
        >
          ← Choose different payment method
        </button>
      </div>
    );
  }

  if (status === 'processing' && selectedMethod === 'crypto') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-primary/50 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Link2 className="text-accent" /> Cryptocurrency Payment
          </h3>
          
          <div className="bg-secondary/50 rounded-lg border border-white/5 p-6 text-center mb-6">
            <p className="text-white font-bold text-2xl mb-2">₹{total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-textSecondary">Send equivalent amount in your preferred crypto</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-secondary/50 rounded-lg border border-white/5 p-4">
              <label className="text-xs text-textSecondary mb-2 block">Bitcoin (BTC) Address:</label>
              <div className="flex items-center justify-between gap-2">
                <span className="text-white font-mono text-xs break-all">{PAYMENT_CONFIG.cryptoAddresses.bitcoin}</span>
                <button 
                  onClick={() => copyToClipboard(PAYMENT_CONFIG.cryptoAddresses.bitcoin, 'Bitcoin Address')}
                  className="text-accent hover:text-accent/80 p-2 shrink-0"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg border border-white/5 p-4">
              <label className="text-xs text-textSecondary mb-2 block">Ethereum (ETH) Address:</label>
              <div className="flex items-center justify-between gap-2">
                <span className="text-white font-mono text-xs break-all">{PAYMENT_CONFIG.cryptoAddresses.ethereum}</span>
                <button 
                  onClick={() => copyToClipboard(PAYMENT_CONFIG.cryptoAddresses.ethereum, 'Ethereum Address')}
                  className="text-accent hover:text-accent/80 p-2 shrink-0"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg border border-white/5 p-4">
              <label className="text-xs text-textSecondary mb-2 block">USDT (TRC20/ERC20) Address:</label>
              <div className="flex items-center justify-between gap-2">
                <span className="text-white font-mono text-xs break-all">{PAYMENT_CONFIG.cryptoAddresses.usdt}</span>
                <button 
                  onClick={() => copyToClipboard(PAYMENT_CONFIG.cryptoAddresses.usdt, 'USDT Address')}
                  className="text-accent hover:text-accent/80 p-2 shrink-0"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <label className="text-sm text-white mb-2 block">After sending crypto, enter your Transaction Hash/ID:</label>
            <input 
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g., 0x1234567890abcdef..."
              className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-textSecondary focus:border-accent focus:outline-none mb-4"
            />
            <button 
              onClick={handlePaymentComplete}
              className="w-full rounded-lg bg-accent py-3 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all"
            >
              Confirm Payment
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => { setStatus('idle'); setSelectedMethod(null); }}
          className="text-textSecondary hover:text-white text-sm"
        >
          ← Choose different payment method
        </button>
      </div>
    );
  }

  // Default: Show payment method selection
  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-primary/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">Choose Payment Method</label>
            <div className="flex gap-2 text-textSecondary">
              <ShieldCheck size={14} className="text-green-500" />
              <span className="text-[10px] font-mono text-green-500">INSTANT PAYMENTS</span>
            </div>
          </div>
          
          {/* Payment Method Cards */}
          <div className="space-y-3">
            {/* UPI */}
            <button
              onClick={() => handleMethodSelect('upi')}
              className="w-full flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="h-10 w-14 bg-white/90 rounded flex items-center justify-center p-1">
                <Smartphone className="text-black" size={24} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-bold text-white">UPI Payment</div>
                <div className="text-xs text-textSecondary">Pay via GPay, PhonePe, Paytm, any UPI app</div>
              </div>
              <QrCode size={20} className="text-accent" />
            </button>

            {/* PayPal */}
            <button
              onClick={() => handleMethodSelect('paypal')}
              className="w-full flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="h-10 w-14 bg-blue-600 rounded flex items-center justify-center p-1">
                <span className="text-white font-bold text-xs">PayPal</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-bold text-white">PayPal</div>
                <div className="text-xs text-textSecondary">Worldwide payments accepted</div>
              </div>
              <ExternalLink size={20} className="text-accent" />
            </button>

            {/* Bank Transfer */}
            <button
              onClick={() => handleMethodSelect('bank')}
              className="w-full flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="h-10 w-14 bg-green-600/90 rounded flex items-center justify-center p-1">
                <CreditCard className="text-white" size={24} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-bold text-white">Bank Transfer</div>
                <div className="text-xs text-textSecondary">Direct transfer to bank account</div>
              </div>
              <CreditCard size={20} className="text-accent" />
            </button>

            {/* Cryptocurrency */}
            <button
              onClick={() => handleMethodSelect('crypto')}
              className="w-full flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="h-10 w-14 bg-orange-500/90 rounded flex items-center justify-center p-1">
                <Link2 className="text-white" size={24} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-bold text-white">Cryptocurrency</div>
                <div className="text-xs text-textSecondary">Bitcoin, Ethereum, USDT</div>
              </div>
              <Link2 size={20} className="text-accent" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-[10px] text-textSecondary">
          <ShieldCheck size={12} />
          <span>All payments are verified manually within 24 hours</span>
        </div>
      </div>
    </div>
  );
};
