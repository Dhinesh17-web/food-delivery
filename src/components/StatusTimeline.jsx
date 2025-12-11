import clsx from 'clsx';

const steps = [
  'Order Placed',
  'Restaurant Accepted',
  'Preparing Food',
  'Out for Delivery',
  'Delivered',
];

export default function StatusTimeline({ currentStatus }) {
  return (
    <ol className="space-y-3">
      {steps.map((step) => {
        const done = steps.indexOf(step) <= steps.indexOf(currentStatus);
        return (
          <li
            key={step}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
          >
            <span
              className={clsx(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                done ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
              )}
            >
              {done ? '✔' : '•'}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{step}</p>
              {done && (
                <p className="text-xs text-slate-500">Completed</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

