export type NavItem = {
  name: string;
  href: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type FooterNavData = {
  brand: {
    name: string;
    description: string;
    logo: ReactNode;
  };
  socialLinks: { href: string; icon: ReactNode }[];
  footerSections: NavSection[];
  copyright: string;
  paymentMethods: string[];
};
