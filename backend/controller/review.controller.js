import { asyncHandler } from "../middleware/asynchandler.middleware.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";

const addReview = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  const newReview = {
    ...req.body,
    user: req.user._id,
  };

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.reviews.push(newReview);
  product.numReviews = product.reviews.length;

  //   Question for sir
  //   Tyo product section ko rating ma chai average of all the rating nikalera dekhaune ho ?

  //   const totalRating = product.reviews.reduce(
  //     (acc, review) => acc + review.rating,
  //     0
  //   );
  //   product.rating = totalRating / product.reviews.length;

  await product.save();

  res
    .status(201)
    .json({ message: "Review added successfully", review: newReview });
});

export { addReview };
