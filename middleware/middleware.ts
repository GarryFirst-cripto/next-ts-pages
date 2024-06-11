import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

export function withMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Здесь можно добавить логику middleware
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    return handler(req, res)
  }
}