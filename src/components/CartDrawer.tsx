import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeLine, isLoading, error } = useCart();

  if (!isOpen) return null;

  const lines = cart?.lines ?? [];
  const currency = cart?.currencyCode ?? 'EUR';

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-EU', { style: 'currency', currency }).format(amount);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-[60] animate-fade-in" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-700" />
            <h2 className="font-display font-bold text-lg text-brand-950">Your Cart</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
          )}

          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-2">
              <ShoppingBag className="w-10 h-10 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-lg bg-brand-50 overflow-hidden flex-shrink-0">
                    {line.imageUrl && (
                      <img src={line.imageUrl} alt={line.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-brand-950 truncate">{line.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{formatMoney(line.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        disabled={isLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeLine(line.id)}
                        disabled={isLoading}
                        className="ml-auto text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className="p-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-display font-bold text-xl text-brand-950">
                {formatMoney(cart.totalAmount)}
              </span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-brand-950 text-white font-semibold hover:bg-brand-800 transition-colors"
            >
              Checkout securely
            </a>
            <p className="mt-2 text-center text-xs text-gray-400">
              Payment & order processing handled securely by Shopify
            </p>
          </div>
        )}
      </div>
    </>
  );
}
