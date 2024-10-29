import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import User from "../user";

const Navbar = () => {
  return (
    <NextUINavbar isBordered>
      <NavbarBrand>
        <h1 className="font-bold text-xl">E-Commerce</h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex flex-1 gap-4" justify="center">
        <NavbarItem>Shop</NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
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
