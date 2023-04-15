import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { getProducts, describeProducts, updateProduct } from '@/services/productsService'
import CustomTable from '@/components/tables/CustomTable';
import { useEffect, useState } from 'react';
import CustomEditModal from '@/components/modals/CustomEditModal';

export default function Product({ products, formFields }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openModal, setOpenModal] = useState(true);
    const [tableData, setTableData] = useState(products);

    useEffect(() => {
        setTableData(products);
    }, [products]);

    //Edit function
    const handleEdit = async (rowData) => {
        setSelectedProduct(rowData);
        setOpenModal(true);
    }

    const handleDelete = async (id) => {

    }
    return (
        <Layout>
            <main className={styles.main}>
                <CustomTable
                    data={tableData}
                    showActions={true}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </main>
            {selectedProduct &&  (
                <CustomEditModal
                    selectedProduct={selectedProduct}
                    editFunction={updateProduct}
                    formFields={formFields}
                    open={openModal}
                    setOpen={setOpenModal}
                    setTableData={setTableData}
                />
            )}
        </Layout>
    )
}

export async function getServerSideProps() {
    const formFields = await describeProducts();
    const products = await getProducts();
    return {
        props: {
            products,
            formFields
        },
    }
}