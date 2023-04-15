// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    try {
        let response, data;
        switch (req.method) {
            case 'PUT':
                response = await fetch(`http://localhost:8000/api/products/${req.query.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(req.body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                data = await response.json()

                res.status(200).json(data)
                break
            default:
                res.status(400).end(`Method ${req.method} not allowed`)
        }
    } catch (error) {
        console.log(`Error en metodo ${req.method}: ${error.message}`);
        res.status(500).json({ statusCode: 500, message: error.message })
    }
}