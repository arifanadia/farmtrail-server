import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        minlength: 3
    },
    mainPrice: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number
    },
    priceBySize: [
        {
            size: { type: String, required: true },
            price: { type: Number, required: true },
            offerPrice: { type: Number }
        }
    ],
    gramToPrice: [
        {
            weight: { type: String, required: true }, // E.g., "100g"
            price: { type: Number, required: true }  // E.g., 2.55
        }
    ],
    overview: {
        type: String,
        required: true
    },
    aboutProduct: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: Object
    },
    tags: [
        {
            type: String
        }
    ],
    category: {
        type: String,
        required: true
    },
    reviews: [
        {
            username: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String }
        }
    ],
    images: [
        {
            type: String
        }
    ],
    packageVariety: [
        {
            type: String
        }
    ],
    quantity: {
        type: Number,
        required: true
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    }
});


const Product = mongoose.model('Product', productSchema);
export default Product;
