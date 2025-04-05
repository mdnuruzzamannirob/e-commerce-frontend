export const metadata = {
  title: 'Orders | The-1 Order History',
  description:
    'View your order history and track your purchases on The-1. Stay updated on your shopping journey.',
  keywords: 'orders, order history, track purchases, The-1, e-commerce',
};

const Orders = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">My Orders</h1>
      <p className="mt-4 text-lg">
        Welcome to your order history. Here, you can view details of your past purchases and track
        the progress of your current orders.
      </p>
      <p className="mt-2 text-lg">
        If you haven&apos;t placed any orders yet, start shopping now and check back here to see
        your order details.
      </p>
    </div>
  );
};

export default Orders;
