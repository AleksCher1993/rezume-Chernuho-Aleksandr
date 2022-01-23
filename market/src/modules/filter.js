export const searchFilter = (data, value) => {
  return data.filter((elem) => {
    return elem.title.toLowerCase().includes(value.toLowerCase());
  });
};
export const catalogFilter = (data, value) => {
  return data.filter((elem) => {
    return elem.category.includes(value);
  });
};
export const priceFilter = (data, min, max) => {
  return data.filter((elem) => {
    if (min == "" && max == "") {
      return elem;
    } else if (min != "" && max == "") {
      return elem.price > min;
    } else if (min == "" && max != "") {
      return elem.price < max;
    } else if (min != "" && max != "") {
      return elem.price > min && elem.price < max;
    }
  });
};
export const hotSaleFilter = (data, value) => {
  return data.filter((elem) => {
    if (value) {
      return elem.sale === true;
    } else {
      return elem;
    }
  });
};
