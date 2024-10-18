import { Request, Response } from 'express'
import Product from '../model/products';


export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
