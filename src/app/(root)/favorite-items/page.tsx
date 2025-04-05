export const metadata = {
  title: 'Favorite Items | The-1 Wishlist',
  description:
    'View and manage your favorite items on The-1. Save products to your wishlist for easy access later.',
  keywords: 'favorite items, wishlist, saved products, The-1, e-commerce',
};

const FavoriteItems = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Your Favorite Items</h1>
      <p className="mt-4 text-lg">
        Browse your saved items and keep track of the products you love. Add them to your cart when
        you&apos;re ready to purchase.
      </p>
      <p className="mt-2 text-lg">
        Your wishlist is currently empty. Start adding your favorite items to easily find them
        later.
      </p>
    </div>
  );
};

export default FavoriteItems;
