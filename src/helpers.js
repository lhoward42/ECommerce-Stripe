export const isInCart = (product, cartItems, metadata, metadata2) => {
  // console.log(">>>>>>>", product, cartItems," metadata", metadata)

  const isIn = cartItems.find(
    (item) =>
      item.id === product.id &&
      item.metadata.property === metadata &&
      item.metadata.property2 === metadata2
  );
  console.log("isIn", isIn);
  return isIn;
};

export const hasValueAttributes = (product) => {
  const value = product.value ? true : false;
  console.log(value, product.value);
  if (value === true && product.value.length > 0) {
    return value;
  } else {
    return false;
  }
};

export const hasValueAttributes2 = (product) => {
  const value = product.value2 ? true : false;
  console.log(value, product.value2);
  if (value === true && product.value2.length > 0) {
    return value;
  } else {
    return false;
  }
};

const API = "http://localhost:3001";

export async function fetchFromAPI(endpoint, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };

  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
