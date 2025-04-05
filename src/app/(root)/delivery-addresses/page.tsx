export const metadata = {
  title: 'Manage Delivery Addresses | The-1 E-Commerce',
  description: 'Easily manage your delivery addresses for a seamless shopping experience on The-1.',
  keywords: 'delivery addresses, manage addresses, shipping, The-1, e-commerce',
};

const DeliveryAddresses = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Manage Your Delivery Addresses</h1>
      <p className="mt-4 text-lg">
        Keep your delivery information up-to-date to ensure a smooth and hassle-free shopping
        experience. Add, edit, or remove your addresses below.
      </p>
      <p className="mt-2 text-lg">
        Start by adding a new address or selecting an existing one for your next order.
      </p>
    </div>
  );
};

export default DeliveryAddresses;
