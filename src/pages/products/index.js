import styles from '@/styles/Home.module.css'
import Layout from '../../../components/Layout'
import { getProducts } from '../../../services/productsService'
import CustomTable from '../../../components/CustomTable';

export default function Product({ products }) {
    return (
        <Layout>
            <main className={styles.main}>
                <CustomTable data={products} />
            </main>
        </Layout>
    )
}

export async function getServerSideProps() {
    const products = await getProducts();
    return {
        props: {
            products,
        },
    }
}