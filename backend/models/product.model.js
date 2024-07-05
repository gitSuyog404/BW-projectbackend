import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String,
  rating: Number,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      minlength: 3,
    },

    image: {
      type: String,
      // required: true,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      //   you can add categories by adding enum :[]
      //   you can add lowercase : true to store the data in lowercase form in the database
    },

    price: {
      type: Number,
      required: true,
      //   you can add custom message by required: [true, "You need to add price"]
    },

    countInStock: {
      default: 0,
      type: Number,
      required: true,
    },

    rating: {
      default: 0,

      type: Number,
      required: true,
    },

    numReviews: {
      default: 0,

      type: Number,
      required: true,
    },

    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
// Two ways to create nested objects for the reviews one is to create objects inside the objects another is to create a schema for reviews and referencing it here
// creating schema for reviews is a better approach

// setting {timestamps: true} will add createdAt and updatedAt time .
