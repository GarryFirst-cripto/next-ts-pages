import { NextApiRequest, NextApiResponse } from 'next';
import { socials } from './data/socials';
import { withMiddleware } from '../../middleware/middleware';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(socials);
  };
}

export default withMiddleware(handler)
