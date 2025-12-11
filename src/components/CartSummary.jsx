export default function CartSummary({ total, onCheckout }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <button
        onClick={onCheckout}
        className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={total <= 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

