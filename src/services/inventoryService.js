export async function getInventory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/inventory`)
    const inventory = await res.json()

    return inventory
}

export async function describeInventory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/inventory`, {
        method: 'OPTIONS'
    })
    const modelDescription = await res.json()

    return modelDescription
}

export async function updateInventory(inventory) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/inventory`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventory)
    })
    const updatedInventory = await res.json()

    return updatedInventory
}