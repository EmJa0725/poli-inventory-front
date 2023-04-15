import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import CustomAddForm from '@/components/forms/CustomAddForm'
import { createProduct, describeProducts } from '@/services/productsService'

export default function AddProduct({ formFields }) {
    return (
        <Layout>
            <main className={styles.main}>
                <CustomAddForm addFunction={createProduct} formFields={formFields}></CustomAddForm>
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

