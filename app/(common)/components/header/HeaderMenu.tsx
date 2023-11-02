'use client';

import { NavbarItem, NavbarMenu } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

function HeaderMenu(props: { links: { href: string; content: string }[] }) {
    const pathname = usePathname();

    return (
        <NavbarMenu>
            {props.links.map(link => (
                <NavbarItem key={link.content}>
                    <Link
                        color={pathname === link.href ? 'primary' : 'foreground'}
                        href={link.href}
                        as={NextLink}
                        className='w-full'
                        size='lg'
                    >
                        {link.content}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarMenu>
    );
}

export default HeaderMenu;
