import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Logo from "@/assets/hotel_logo.svg";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  logo?: {
    src: string;
    alt: string;
  };
  links?: {
    text: string;
    href: string;
  }[];
}

const navbarProps: NavbarProps = {
  logo: {
    src: Logo,
    alt: "Neon Star Hotel Logo",
  },
  links: [
    { text: "Odalar", href: "/rooms" },
    { text: "Hakkımızda", href: "/about" },
    { text: "İletişim", href: "/contact" },
  ],
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur dark:bg-zinc-950/80 bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <div className="flex gap-4 items-center content-center">
          {navbarProps.logo && (
            <img src={navbarProps.logo.src} alt={navbarProps.logo.alt} className="h-16 w-auto text-black dark:text-white" />
          )}
          <Link to="/" className="text-xl font-bold tracking-wide text-zinc-900 dark:text-white">
            Neon<span className="text-violet-700 dark:text-violet-500">Star</span> Hotel
          </Link>
        </div>

        {/* Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="gap-6">
            {navbarProps.links?.map((link) => (
              <NavigationMenuItem key={link.text}>
                <Link
                  to={link.href}
                  className="text-sm text-zinc-600 dark:text-zinc-300 transition hover:text-black dark:hover:text-white"
                >
                  {link.text}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="ghost"
            className="hidden md:inline-flex text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
          >
            Rezervasyonlarım
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            Profil
          </Button>
        </div>
      </div>
    </header>
  );
}