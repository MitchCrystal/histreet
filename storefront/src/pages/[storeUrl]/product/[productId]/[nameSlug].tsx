import MainLayout from '@/layouts/MainLayout'

function ProductPage() {
    return (
        <>
        <p>Products</p>
        </>
    )
}


export default function() {
    return (
        <MainLayout title="name">
            <ProductPage />
        </MainLayout>
    )
}