import Logo from '@/components/Logo';
import Image from 'next/image';

const Login = () => {
  return (
    <div className="container flex min-h-dvh items-center justify-end gap-5 py-20">
      <div className="absolute inset-0 -z-10 mr-auto flex h-full w-1/2 bg-transparent max-lg:hidden">
        <Image
          src="/side_image.png"
          alt="side logo"
          fill
          className="object-cover object-center mix-blend-multiply"
        />
      </div>

      <div className="max-w-lg">
        <Logo />
        <h1>Login</h1>
        <p>Enter your details bellow</p>
      </div>
    </div>
  );
};

export default Login;
