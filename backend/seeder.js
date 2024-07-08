import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import colors from "colors";

// if node ko version 20.10.0 vanda thorai xa vane
// npm i dotenv
// import dotenv from "dotenv"

import connectDb from "./config/db.js";

// if node ko version 20.10.0 vanda dherai xa
process.loadEnvFile();

// if node ko version 20.10.0 vanda thorai xa
// dotenv.config();
connectDb();

const loadData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    let newUsers = await User.insertMany(users);

    await Product.insertMany(
      products.map((product) => {
        return {
          ...product,
          user: newUsers[0]._id,
        };
      })
    );
    console.log("Data imported successfully".green.inverse);
    process.exit();
  } catch (err) {
    console.log("Error occured while loading data:", err.message);
    process.exit(1);
  }

  // let newProducts = await Product.insertMany(products)
};

let destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log("Error occured while removing data: ", err.message);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  loadData();
}
