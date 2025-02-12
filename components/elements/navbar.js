import { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { MdMenu } from "react-icons/md";
import MobileNavMenu from "./mobile-nav-menu";
import ButtonLink from "./button-link";
import Image from "./image";
import {
  mediaPropTypes,
  linkPropTypes,
  buttonLinkPropTypes,
} from "utils/types";
import { getButtonAppearance } from "utils/button";
import CustomLink from "./custom-link";

const Navbar = ({ navbar }) => {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  return (
    <>
      {/* The actual navbar */}
      <nav className="shadow-lg py-6 sm:py-3 bg-white">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/[[...slug]]" as="/">
              <a aria-label="Página inicial">
                <Image
                  media={navbar.logo}
                  className="h-10 w-auto object-contain"
                  alt="Logomarca Ribermax"
                />
              </a>
            </Link>
            {/* List of links on desktop */}
            <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10 text-lg">
              {navbar.links.map((navLink) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink}>
                    <div className="hover:text-gray-900 px-2 py-1">
                      {navLink.text}
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Hamburger menu on mobile */}
          <button
            onClick={() => setMobileMenuIsShown(true)}
            className="p-1 block md:hidden"
            aria-label="Menu principal"
          >
            <MdMenu className="h-8 w-auto" />
          </button>
          {/* CTA button on desktop */}
          {navbar.button && (
            <div className="hidden md:block">
              <ButtonLink
                button={navbar.button}
                appearance={getButtonAppearance(navbar.button.type, "light")}
                compact
                aria-label="Menu principal"
              />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
          aria-label="Fechar menu principal"
        />
      )}
    </>
  );
};

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: mediaPropTypes,
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
};

export default Navbar;
