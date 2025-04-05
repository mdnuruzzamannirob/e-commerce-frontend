export const metadata = {
  title: 'Returns | The-1 Return History',
  description:
    'View and manage your return requests and history on The-1. Track the status of your returns easily.',
  keywords: 'my returns, return history, orders, The-1, e-commerce',
};

const Returns = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Manage Your Returns</h1>
      <p className="mt-4 text-lg">
        Welcome to the Returns page. Here, you can manage your return requests and track the status
        of your returned items.
      </p>
      <p className="mt-2 text-lg">
        If you have any issues with your orders, you can initiate a return request and monitor its
        progress here.
      </p>
      <p className="mt-2 text-lg">
        Currently, you have no return requests. Start shopping and return items if needed, and track
        them here.
      </p>
    </div>
  );
};

export default Returns;
