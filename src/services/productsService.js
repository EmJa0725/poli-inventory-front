export async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/products`)
    const products = await res.json()

    return products
}

export async function describeProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/products`, {
        method: 'OPTIONS'
    })
    const modelDescription = await res.json()

    return modelDescription
}

export async function createProduct(data) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/products`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await res.json()
        return response
    }
    catch (error) {
        console.log(error);
        return { message: 'Error al crear el producto' }
    }
}

export async function updateProduct(data) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/products/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await res.json()
        return response
    }
    catch (error) {
        console.log(error);
        return { message: 'Error al actualizar el producto' }
    }
}

export async function deleteProduct(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error);
        return { message: 'Error al eliminar el producto' }
    }
}