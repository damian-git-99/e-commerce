import mongoose, { Model, model } from 'mongoose';
const { Schema } = mongoose;

interface ReviewSchema {
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewSchema>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export interface Product {
  user: mongoose.Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews?: [];
  rating?: number;
  numReviews: number;
  countInStock: number;
  price: number;
}

const ProductSchema = new Schema<Product>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// change _id to id https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const ProductModel: Model<Product> = model('Product', ProductSchema);
