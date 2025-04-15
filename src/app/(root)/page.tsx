import Image from 'next/image';

const Home = () => {
  return (
    <main className="">
      {/* header section */}
      <section className="container flex min-h-dvh flex-col items-center justify-between gap-10 py-20 lg:flex-row">
        <div className="w-full">
          <h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Payments tool for software companies
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400">
            From checkout to global sales tax compliance, companies around the world use Flowbite to
            simplify their payment stack.
          </p>
          <div className="flex items-center gap-5">
            {' '}
            <button className="flex items-center justify-center gap-1 rounded-md bg-blue-500 px-4 py-2 text-base text-white transition-colors hover:bg-blue-600">
              Get started
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd" // Fixed camelCase
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd" // Fixed camelCase
                ></path>
              </svg>
            </button>
            <button className="e rounded-md border px-4 py-2 text-base transition-colors hover:bg-black/5">
              Speak to Sales
            </button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
            width={500}
            height={500}
            className="min-h-[400px] min-w-[400px] select-none"
          />
        </div>
      </section>

      {/* newsLatter section */}
      <section className="relative flex h-[80dvh] w-full flex-col items-center justify-center gap-6 bg-[url('/Newsletter_BG.avif')] bg-contain py-10">
        <div className="bg-background/85 absolute inset-0"></div>

        <h1 className="font-tertiary z-10 bg-gradient-to-b from-stone-500 to-stone-300 bg-clip-text text-center text-[40px] leading-relaxed font-bold text-transparent uppercase">
          Discover Style Just <br /> A Button Press Away!
        </h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="Your email address"
          className="font-tertiary z-10 mx-auto h-12 w-full max-w-xl rounded-sm border bg-zinc-900 text-center text-base outline-none"
        />
        <button className="font-tertiary z-10 h-12 w-full max-w-xl rounded-sm bg-black text-base font-semibold text-white dark:bg-neutral-300 dark:text-black">
          Subscribe
        </button>
        <h6 className="font-tertiary z-10 text-center text-[13px] font-medium text-neutral-500 uppercase">
          Instantly access the latest fashion trends and exclusive deals on <br /> our site.
          Discover your perfect style in a few clicks!
        </h6>
      </section>
    </main>
  );
};

export default Home;
