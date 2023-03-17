import AdminLayout from '@/layouts/AdminLayout'
import { useRouter } from 'next/router'


function OrderDetail() {
    return (
        <>
        <p>Order detail</p>
        </>
    )
}


export default function() {
    return (
        <AdminLayout>
            <OrderDetail />
        </AdminLayout>
    )
}