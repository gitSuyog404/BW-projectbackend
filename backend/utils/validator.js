const isEmail = (email) => {
  const emailPattern =
    /^([a-z][a-z0-9_\.]+[a-z0-9])@([a-z0-9]{2,20})\.([a-z]{2,5})(\.[a-z]{2,5})?$/;
  return emailPattern.test(email);
};

const isPassword = (password) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&\*])[A-Za-z\d!@#$%^&\*]{8,}$/;

  return passwordPattern.test(password);
};

const isPrice = (price) => {
  const pricePattern = /^\d+(\.\d{1,2})?$/;

  return pricePattern.test(price);
};

const isProduct = (product) => {
  const productNamePattern = /^[a-zA-Z0-9\s]{3,50}$/;
  return productNamePattern.test(product);
};

export { isEmail, isPassword, isPrice, isProduct };
