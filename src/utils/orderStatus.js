export const ORDER_STEPS = [
  'Order Placed',
  'Restaurant Accepted',
  'Preparing Food',
  'Out for Delivery',
  'Delivered',
];

export const getNextStatus = (current) => {
  const idx = ORDER_STEPS.indexOf(current);
  if (idx === -1 || idx === ORDER_STEPS.length - 1) return null;
  return ORDER_STEPS[idx + 1];
};

