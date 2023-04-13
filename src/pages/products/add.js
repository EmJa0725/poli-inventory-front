import styles from '@/styles/Home.module.css'
import Layout from '../../components/Layout'
import CustomForm from '../../components/CustomForm'
import { createProduct, describeProducts } from '../../services/productsService'

export default function AddProduct({ formFields }) {
    return (
        <Layout>
            <main className={styles.main}>
                <CustomForm addFunction={createProduct} formFields={formFields}></CustomForm>
            </main>
        </Layout>
    )
}

export async function getServerSideProps() {
    const formFields = await describeProducts();
    return {
        props: {
            formFields,
        },
    }
}

