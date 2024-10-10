'use client';

import { NavbarMenuItem, NavbarMenu } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

function HeaderMenu(props: { links: { href: string; content: string }[] }) {
    const pathname = usePathname();

    return (
        <NavbarMenu>
            {props.links.map(link => (
                <NavbarMenuItem key={link.content}>
                    <Link
                        color={pathname === link.href ? 'primary' : 'foreground'}
                        href={link.href}
                        as={NextLink}
                        className='w-full py-4'
                        size='lg'
                    >
                        {link.content}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    );
}

export default HeaderMenu;
