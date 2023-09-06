import React, { useState, useEffect } from "react";

export const ITEM_API_URL = "https://pokeapi.co/api/v2/item";

const fetchItemDetails = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

function ItemList() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`${ITEM_API_URL}?limit=100`); // Assuming 100 is a suitable limit.
      const body = await response.json();
      const itemPromises = body.results.map((item) =>
        fetchItemDetails(item.url)
      );
      const itemsDetails = await Promise.all(itemPromises);
      setItemList(itemsDetails);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {itemList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
