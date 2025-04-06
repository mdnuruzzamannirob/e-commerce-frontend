import { MdFavoriteBorder, MdUTurnRight } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { BsCartPlus, BsDisplay, BsMoonStars, BsSun } from 'react-icons/bs';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import Logo from '@/components/Logo';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { FooterNavData } from '@/types';

export const accountMenuItems = [
  {
    icon: <BsCartPlus className="size-4" />,
    text: 'My Orders',
    url: '/orders',
  },
  {
    icon: <MdFavoriteBorder className="size-4" />,
    text: 'Favorite Items',
    url: '/favorite-items',
  },
  {
    icon: <MdUTurnRight className="size-4 -rotate-90" />,
    text: 'My Returns',
    url: '/returns',
  },
  {
    icon: <GoHome className="size-4" />,
    text: 'Delivery Addresses',
    url: '/delivery-addresses',
  },
  {
    icon: <IoMdHelpCircleOutline className="size-4" />,
    text: 'Help Center',
    url: '/help-center',
  },
];

export const themeOptions = [
  {
    code: 'system',
    name: 'System',
    icon: <BsDisplay className="size-5" />,
  },
  {
    code: 'dark',
    name: 'Dark',
    icon: <BsMoonStars className="size-5" />,
  },
  {
    code: 'light',
    name: 'Light',
    icon: <BsSun className="size-5" />,
  },
];

// footer-data.ts
export const footerNavData: FooterNavData = {
  brand: {
    name: 'THE-1',
    description:
      'Welcome to your fashion destination. Discover the latest trends, find perfect pieces for your wardrobe, and enjoy seamless online shopping.',
    logo: <Logo />,
  },
  socialLinks: [
    {
      href: '',
      icon: <FaFacebook key="facebook" className="size-full" />,
    },
    {
      href: '',
      icon: <FaInstagram key="instagram" className="size-full" />,
    },
    {
      href: '',
      icon: <FaXTwitter key="twitter" className="size-full" />,
    },
    {
      href: '',
      icon: <FaLinkedin key="linkedin" className="size-full" />,
    },
    {
      href: '',
      icon: <FaTiktok key="tiktok" className="size-full" />,
    },
    {
      href: '',
      icon: <FaYoutube key="youtube" className="size-full" />,
    },
  ],
  footerSections: [
    {
      title: 'Product',
      items: [
        { name: 'Home', href: '/' },
        { name: 'Advisable', href: '/advisable' },
        { name: 'Promotions', href: '/promotions' },
      ],
    },
    {
      title: 'Company',
      items: [
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: '40%', href: '/discount-policy' }, // Consider renaming this to something more descriptive
      ],
    },
  ],
  copyright: '© 2024 THE-1. All rights reserved.',
  paymentMethods: [
    '/visa.avif',
    '/mastercard.avif',
    '/gpay.avif',
    '/ipay.avif',
    '/paypal.avif',
    '/stripe.png',
  ],
};

export const demoCartData = [
  {
    id: 1,
    name: 'Apple iMac 20',
    variant: '512GB, 32GB RAM',
    quantity: 5,
    price: 2999,
    url: '/products/imac-20',
    imageUrl: 'https://example.com/images/imac-20.jpg',
  },
  {
    id: 2,
    name: 'Apple iPhone 15',
    variant: 'Gold Edition, 256GB',
    quantity: 1,
    price: 599,
    url: '/products/iphone-15',
    imageUrl: 'https://example.com/images/iphone-15.jpg',
  },
  {
    id: 3,
    name: 'Apple iPad Air',
    variant: 'Silver, 64GB',
    quantity: 3,
    price: 38599,
    url: '/products/ipad-air',
    imageUrl: 'https://example.com/images/ipad-air.jpg',
  },
  {
    id: 4,
    name: 'Apple Watch SE',
    variant: 'Purple, GPS',
    quantity: 1,
    price: 199,
    url: '/products/watch-se',
    imageUrl: 'https://example.com/images/watch-se.jpg',
  },
];
