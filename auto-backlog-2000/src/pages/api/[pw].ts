import type { NextApiRequest, NextApiResponse } from 'next';

const passwordKey = process.env.PASSWORD_KEY;

/**
 * Checks if a Password is correct
 *
 * @param { NextApiRequest } req Request object
 * @param {NextApiResponse} res Response object
 */
export default async function checkPassword(req: NextApiRequest, res: NextApiResponse) {
    if (!passwordKey) {
        res.status(500).json({ error: 'No password provided' });
        return;
    }
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    const { pw } = req.query;
    if (pw !== passwordKey) {
        res.status(400).json({ error: 'Invalid password' });
        return;
    }
    if (pw === passwordKey) {
        res.status(200).json({ success: true });
        return;
    }
}
