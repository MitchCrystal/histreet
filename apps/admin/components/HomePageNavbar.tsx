import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

const menuItems = [
  {
    id: 'Sign Up',
    name: 'Sign Up',
    href: '/sign-up',
  },
  {
    id: 'Sign In',
    name: 'Sign In',
    href: '/sign-in',
  },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <nav className="py-8 px-4 bg-gray-800">
        <div className="max-w-full mx-5 flex items-center justify-between">
          <div className="flex text-3xl md:text-6xl font-bold text-white">
            <img src={'/histreet-yellow-square.png'} alt="Hi Street" className='w-9 sm:w-[75px] sm:pr-2' />
            Hi Street
          </div>
          <div className="sm:hidden flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>Sign Up/Sign In</DropdownMenuTrigger>
              <DropdownMenuContent>
                {menuItems.map((item) => {
                  if (item.id !== 'cart') {
                    return (
                      <Link key={item.id} href={`/auth${item.href}`}>
                        <DropdownMenuItem>{item.name}</DropdownMenuItem>
                      </Link>
                    );
                  }
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden sm:flex sm:gap-4">
            {menuItems.map((item) => (
              <Link key={item.id} href={`/auth${item.href}`}>
                <Button
                  key={item.id}
                  href={`/auth${item.href}`}
                  size="default"
                  appearance="primary"
                  type="button"
                  children={item.name}
                ></Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
