import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { getInventory, describeInventory, updateInventory } from '@/services/inventoryService';
import CustomTable from '@/components/tables/CustomTable';
import { useEffect, useState } from 'react';
import CustomAlert from '@/components/alerts/CustomAlert';
import CustomModal from '@/components/modals/CustomModal';
import ConfirmInventoryForm from '@/components/forms/ConfirmInventoryForm';

export default function Product({ inventory, formFields }) {
    const title = 'Inventory'
    const [tableData, setTableData] = useState(inventory);
    const [updatedItems, setUpdatedItems] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(null);
    const [alertProps, setAlertProps] = useState({
        show: false,
        type: 'success',
        message: '',
        vertical: 'top',
        horizontal: 'right',
    });

    useEffect(() => {
        setTableData(inventory);
    }, [inventory]);

    const handleQuantityChange = async (quantity) => {
        setQuantity(quantity);
    }

    const handleIncrement = async (rowData) => {
        setTableData(tableData.map((item) => {
            if (item.id === rowData.id) {
                return { ...item, quantity: Number(item.quantity) + Number(quantity) }
            }
            return item;
        }));
        // setQuantity(null);
    }

    const handleDecrement = async (rowData) => {
        const updatedData = tableData.map((item) => {
            if (item.id === rowData.id) {
                const newQuantity = Number(item.quantity) - Number(quantity);
                if (newQuantity < 0) {
                    setAlertProps({
                        show: true,
                        type: 'error',
                        message: `New quantity for ${item.name} cannot be less than 0`,
                        vertical: 'top',
                        horizontal: 'right',
                    });
                    return item;
                } else {
                    return { ...item, quantity: newQuantity }
                }
            }
            return item;
        });
        setTableData(updatedData);
        // setQuantity(null);
    }

    const handleConsolidateInventory = async () => {
        const updatedItems = tableData.filter((item) => {
            return item.quantity !== inventory.find((invItem) => invItem.id === item.id).quantity;
        }).map((item) => {
            const oldQuantity = inventory.find((invItem) => invItem.id === item.id).quantity;
            const newQuantity = item.quantity;
            return {
                id: item.id,
                name: item.name,
                'old quantity': oldQuantity,
                'new quantity': newQuantity,
            }
        });
        setUpdatedItems(updatedItems);
    }

    useEffect(() => {
        if (updatedItems.length > 0) {
            setConfirmModalOpen(true);
        }
        console.log(updatedItems);
    }, [updatedItems]);

    return (
        <Layout>
            {alertProps.show && <CustomAlert alertProps={alertProps} setAlertProps={setAlertProps} />}
            <main className={styles.main}>
                <CustomTable
                    data={tableData}
                    inventoryActions={true}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    handleQuantityChange={handleQuantityChange}
                    handleConsolidateInventory={handleConsolidateInventory}
                />
            </main>
            {setConfirmModalOpen && (
                <CustomModal
                    open={confirmModalOpen}
                    setOpen={setConfirmModalOpen}
                    ChildComponent={ConfirmInventoryForm}
                    childComponentProps={{
                        title,
                        confirmFunction: updateInventory,
                        confirmDataTable: updatedItems,
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
    const formFields = await describeInventory();
    const inventory = await getInventory();
    return {
        props: {
            inventory,
            formFields
        },
    }
}
