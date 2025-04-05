export const metadata = {
  title: 'Contact Us | The-1 Customer Support',
  description:
    'Reach out to The-1 for any inquiries, support, or assistance. We are here to help you.',
  keywords: 'contact us, customer support, help, inquiries, The-1, e-commerce support',
};

const ContactUs = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-4 text-lg">
        Have questions or need assistance? Our team is here to help. Reach out to us using the
        contact form below or email us directly.
      </p>
      <p className="mt-2 text-lg">
        Email:{' '}
        <a href="mailto:support@the-1.com" className="text-blue-500">
          support@the-1.com
        </a>
      </p>
      <p className="mt-2 text-lg">
        Phone:{' '}
        <a href="tel:+1234567890" className="text-blue-500">
          +1 (234) 567-890
        </a>
      </p>
    </div>
  );
};

export default ContactUs;
