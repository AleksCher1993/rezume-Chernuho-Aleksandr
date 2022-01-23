const getDate = () => {
  return fetch(
    "https://mytestapp-253712-default-rtdb.firebaseio.com/goods.json"
  ).then((response) => response.json());
};
export default getDate;
