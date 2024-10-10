import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from '@nextui-org/navbar';
import { NavbarSlots, SlotsToClasses } from '@nextui-org/react';
import { Link } from '@nextui-org/link';
import HeaderLink from './HeaderLink';
import HeaderMenu from './HeaderMenu';

const NavbarClassNames: SlotsToClasses<NavbarSlots> = {
    base: 'border-b bg-background',
    wrapper: 'w-full max-w-[100vw] px-8',
    brand: 'font-bold',
};

const links = [
    { href: '/insumos', content: 'Insumos' },
    { href: '/productos', content: 'Productos' },
    { href: '/compras', content: 'Compras' },
    { href: '/ventas', content: 'Ventas' },
];

function Header() {
    return (
        <Navbar classNames={NavbarClassNames}>
            <NavbarBrand>
                <Link
                    color='foreground'
                    href='/'
                    underline='hover'
                >
                    Insumos y productos
                </Link>
            </NavbarBrand>
            <NavbarContent
                justify='end'
                className='hidden sm:flex'
            >
                {links.map(link => (
                    <HeaderLink
                        href={link.href}
                        key={link.content}
                    >
                        {link.content}
                    </HeaderLink>
                ))}
            </NavbarContent>
            <NavbarMenuToggle className='sm:hidden' />
            <HeaderMenu links={links} />
        </Navbar>
    );
}

export default Header;
