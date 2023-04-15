// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    try {
        let response, data;
        console.log(req.body);
        switch (req.method) {
            case 'GET':
                response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/inventory`)	
                data = await response.json()

                res.status(200).json(data)
                break
            case 'OPTIONS':
                response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/inventory`, {
                    method: 'OPTIONS'
                });
                data = await response.json()

                res.status(200).json(data)
                break
            case 'PUT':
                response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/inventory`, {
                    method: 'PUT',
                    body: JSON.stringify(req.body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                data = await response.json()

                res.status(200).json(data)
            default:
                res.status(400).end(`Method ${req.method} not allowed`)
        }
    } catch (error) {
        console.log(`Error en metodo ${req.method}: ${error.message}`);
        res.status(500).json({ statusCode: 500, message: error.message })
    }
}