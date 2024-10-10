'use client';

import { NavbarItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { usePathname } from 'next/navigation';

type HeaderLinkProps = {
    href: string;
    children: React.ReactNode;
};

function HeaderLink(props: HeaderLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === props.href;

    return (
        <NavbarItem isActive={isActive}>
            <Link
                color={isActive ? 'primary' : 'foreground'}
                href={props.href}
                isBlock
            >
                {props.children}
            </Link>
        </NavbarItem>
    );
}

export default HeaderLink;
