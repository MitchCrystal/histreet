import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({children}: PropsWithChildren) {
    return (
        <>
        <Toaster/>
        {children}
        </>
    )
}