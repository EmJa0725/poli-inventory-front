export async function getProducts() {
    const res = await fetch('http://localhost:8000/api/products')
    const products = await res.json()

    return products
}

export async function describeProducts() {
    const res = await fetch('http://localhost:8000/api/products', {
        method: 'OPTIONS'
    })
    const products = await res.json()

    return products
}

export async function createProduct(data) {
    const res = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const product = await res.json()

    return product
}