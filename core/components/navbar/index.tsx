import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import User from "../user";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CATEGORY } from "@prisma/client";

const Navbar = () => {
  return (
    <NextUINavbar isBordered>
      <NavbarBrand>
        <h1 className="font-bold text-xl">E-Commerce</h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex flex-1 gap-4" justify="end">
        <ul className="flex items-center gap-4">
          {links.map((link) => (
            <NavbarItem key={link.href}>
              <Link href={link.href}>{link.text}</Link>
            </NavbarItem>
          ))}{" "}
        </ul>
        <NavbarItem>
          <Link color="foreground" href="/cart">
            <ShoppingCartIcon className="size-6" />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <User />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;

const links = [
  {
    href: `/?category=${CATEGORY.CLOTHING}`,
    text: "Shop",
  },
  {
    href: "/wishlist",
    text: "Wishlist",
  },
];
