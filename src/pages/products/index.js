import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { getProducts, describeProducts, createProduct, updateProduct, deleteProduct } from '@/services/productsService'
import CustomTable from '@/components/tables/CustomTable';
import { useEffect, useState } from 'react';
import CustomModal from '@/components/modals/CustomModal';
import CustomEditForm from '@/components/forms/CustomEditForm';
import CustomAddForm from '@/components/forms/CustomAddForm';
import CustomAlert from '@/components/alerts/CustomAlert';
import CustomDeleteForm from '@/components/forms/CustomDeleteForm';

export default function Product({ products, formFields }) {
    const title = 'Product'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tableData, setTableData] = useState(products);
    const [alertProps, setAlertProps] = useState({
        show: false,
        type: 'success',
        message: '',
        vertical: 'top',
        horizontal: 'right',
    });

    useEffect(() => {
        setTableData(products);
    }, [products]);

    const handleEdit = async (rowData) => {
        setSelectedProduct(rowData);
        setEditModalOpen(true);
    }

    const handleAdd = async () => {
        setAddModalOpen(true);
    }

    const handleDelete = async (rowData) => {
        setSelectedProduct(rowData);
        setDeleteModalOpen(true);
    }

    return (
        <Layout>
            {alertProps.show && <CustomAlert alertProps={alertProps} setAlertProps={setAlertProps} />}
            <main className={styles.main}>
                <CustomTable
                    data={tableData}
                    editAction={true}
                    deleteAction={true}
                    addAction={true}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleAdd={handleAdd}
                />
            </main>
            {addModalOpen && (
                <CustomModal
                    open={addModalOpen}
                    setOpen={setAddModalOpen}
                    ChildComponent={CustomAddForm}
                    childComponentProps={{
                        title,
                        addFunction: createProduct,
                        formFields,
                        setTableData,
                        alertProps,
                        setAlertProps
                    }}
                />
            )}
            {selectedProduct && editModalOpen && (
                <CustomModal
                    open={editModalOpen}
                    setOpen={setEditModalOpen}
                    ChildComponent={CustomEditForm}
                    childComponentProps={{
                        title,
                        selectedItem: selectedProduct,
                        editFunction: updateProduct,
                        formFields,
                        setTableData,
                        alertProps,
                        setAlertProps
                    }}
                />
            )}
            {selectedProduct && deleteModalOpen && (
                <CustomModal
                    open={deleteModalOpen}
                    setOpen={setDeleteModalOpen}
                    ChildComponent={CustomDeleteForm}
                    childComponentProps={{
                        title,
                        selectedItem: selectedProduct,
                        deleteFunction: deleteProduct,
                        formFields,
                        setTableData,
                        alertProps,
                        setAlertProps
                    }}
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
