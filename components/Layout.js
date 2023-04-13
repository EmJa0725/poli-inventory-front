import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Layout({ children, title = 'Poli Inventory' }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Tennis store inventory " />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Poli Inventory</h1>
                <div className={styles.grid}>
                    <a href="/products" className={styles.card}>
                        <h3>Products</h3>
                        <p>View all products</p>
                    </a>
                    <a href="/products/add" className={styles.card}>
                        <h3>Add Product</h3>
                        <p>Add a new product</p>
                    </a>
                    <a href="/products/edit" className={styles.card}>
                        <h3>Edit Product</h3>
                        <p>Edit a product</p>
                    </a>
                    <a href="/products/delete" className={styles.card}>
                        <h3>Delete Product</h3>
                        <p>Delete a product</p>
                    </a>
                </div>
                {children}
            </main>
        </>
    )
}