export const metadata = {
  title: 'Cart | The-1 E-Commerce',
  description: 'View and manage the items in your shopping cart. Proceed to checkout when ready.',
  keywords: 'cart, shopping cart, checkout, The-1, e-commerce',
};

const Cart = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      <p className="mt-4 text-lg">
        Review the items in your cart and proceed to checkout when you&apos;re ready. Enjoy a
        seamless shopping experience with The-1.
      </p>
      <p className="mt-2 text-lg">
        Your cart is currently empty. Start adding items to your cart and come back here to complete
        your purchase.
      </p>
    </div>
  );
};

export default Cart;
