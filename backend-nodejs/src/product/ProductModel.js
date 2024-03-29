const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// change _id
reviewSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false,
      default: ''
    },
    public_id_image: {
      type: String,
      required: false,
      default: ''
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;
