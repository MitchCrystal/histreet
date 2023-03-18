import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AuthLayout({children}: PropsWithChildren) {
    return (
        <>
        <Toaster/>
        {children}
        </>
    )
}