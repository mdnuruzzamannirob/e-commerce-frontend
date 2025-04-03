import { MdFavoriteBorder, MdOutlineAccountCircle, MdUTurnRight } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { BsCartPlus } from 'react-icons/bs';
import { IoMdHelpCircleOutline } from 'react-icons/io';

export const accountMenuItems = [
  {
    icon: <BsCartPlus className="size-4" />,
    text: 'My Orders',
    url: '/orders',
  },
  {
    icon: <MdFavoriteBorder className="size-4" />,
    text: 'Favorite Items',
    url: '/favorites',
  },
  {
    icon: <MdUTurnRight className="size-4 -rotate-90" />,
    text: 'My Returns',
    url: '/returns',
  },
  {
    icon: <GoHome className="size-4" />,
    text: 'Delivery Addresses',
    url: '/addresses',
  },
  {
    icon: <MdOutlineAccountCircle className="size-4" />,
    text: 'My Account',
    url: '/account',
  },
  {
    icon: <IoMdHelpCircleOutline className="size-4" />,
    text: 'Help Center',
    url: '/help',
  },
];

export const demoCartData = [
  {
    id: 1,
    name: 'Apple iMac 20',
    variant: '512GB, 32GB RAM',
    quantity: 1,
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
    quantity: 9,
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
