import Image from 'next/image';
import Link from 'next/link';
import { footerNavData } from '@/constants';

const Footer = () => {
  return (
    <footer className="space-y-10 border-t py-10">
      <div className="container flex items-center justify-between gap-10">
        {/* Main content */}
        <div className="flex-1 space-y-5">
          {footerNavData?.brand?.logo}
          <p className="">{footerNavData?.brand?.description}</p>

          <div className="flex items-center gap-4">
            {footerNavData.socialLinks.map((link, index) => (
              <Link
                key={index}
                className="text-muted-foreground flex size-[18px] items-center justify-center rounded transition-colors duration-200 hover:text-inherit"
                href={link?.href}
              >
                {link?.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid flex-2 grid-cols-1 justify-end gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {footerNavData?.footerSections?.map((link, index) => (
            <div key={index} className="ml-auto space-y-4">
              <h6 className="font-semibold">{link?.title}</h6>

              <ul className="space-y-2">
                {link?.items?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item?.href}
                      className="text-muted-foreground transition-colors hover:text-inherit"
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="container flex items-center justify-between gap-5">
        <p>{footerNavData?.copyright}</p>

        <div className="flex flex-wrap items-center gap-1">
          {footerNavData?.paymentMethods?.map((item, index) => (
            <p
              key={index}
              className="flex h-6 items-center justify-center rounded border bg-gray-100 px-2 dark:bg-white"
            >
              <Image
                src={item}
                alt="payment icon"
                width={20}
                height={15}
                className="w-auto select-none"
              />
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
