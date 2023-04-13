// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let response, data;
  switch (req.method) {
    case 'GET':
      response = await fetch('http://localhost:8000/api/products')
      data = await response.json()
    
      res.status(200).json(data)
      break
    case 'POST':
      response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      data = await response.json()

      res.status(200).json(data)
    case 'OPTIONS':
      response = await fetch('http://localhost:8000/api/products', {
        method: 'OPTIONS'
      });
      data = await response.json()

      res.status(200).json(data)
      break
    default:
      res.status(400).end(`Method ${req.method} not allowed`)
  }
}