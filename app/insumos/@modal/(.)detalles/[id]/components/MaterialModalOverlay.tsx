'use client';

import { useRouter } from 'next/navigation';
import { KeyboardEventHandler, MouseEventHandler, ReactNode, useRef } from 'react';

function MaterialModalOverlay(props: { children: ReactNode }) {
    const router = useRouter();
    const dismiss = () => router.back();

    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClick: MouseEventHandler = e => {
        if (e.target === overlayRef.current) dismiss();
    };

    const handleKeyDown: KeyboardEventHandler = e => {
        if (e.key === 'Escape') dismiss();
    };

    return (
        <section
            ref={overlayRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className='flex w-screen h-screen items-center justify-center fixed bottom-0 left-0 right-0 top-16 bg-foreground/50'
        >
            {props.children}
        </section>
    );
}

export default MaterialModalOverlay;
