import db from '../../db/models';
import { getInvoiceData } from '../../handler';

const handler = async (_, res) => {
  try {
    const data = await getInvoiceData(db);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
