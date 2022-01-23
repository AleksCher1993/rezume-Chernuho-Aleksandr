const deleteDate = () => {
  return fetch(
    "https://mytestapp-253712-default-rtdb.firebaseio.com/goods.json",
    {
      method: "DELETE",
    }
  ).then((res) => {
    return res.json();
  });
};
export default deleteDate;
