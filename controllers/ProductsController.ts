import { Request, Response } from "express";
import Product from "../model/products";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const skip = (page - 1) * limit;

    const sort = (req.query.sort as string) || "createdAt";
    const sortOrder = (req.query.order as string) || "desc" ? -1 : 1;

    const { search, priceRange, category } = req.query;
    const query: any = {};
   
     if (search) {
      const regex = new RegExp(search as string, 'i'); 
      query.$or = [
        { productName: { $regex: regex } },
        { description: { $regex: regex } }, 

      ];
    }

    if (priceRange) {
      const [minPrice, maxPrice] = (priceRange as string).split(',').map(Number);
      query.offerPrice = {
        ...(minPrice ? { $gte: minPrice } : {}),
        ...(maxPrice ? { $lte: maxPrice } : {}),
      };
    }
    if (category) {
      query.category = category; 
    }

    const products = await Product.find({})
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
