import Head from 'next/head'
import Link from 'next/link'
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
                    <Link href="/products" className={styles.card}>
                        <h3>Products</h3>
                        <p>View all products</p>
                    </Link>
                    <Link href="/inventory" className={styles.card}>
                        <h3>Inventory</h3>
                        <p>Edit a product</p>
                    </Link>
                </div>
                {children}
            </main>
        </>
    )
}