import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";
import Login from "./components/login/Login";
import "./App.css";

const App = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  function changingSrarchData(e) {
    setSearchValue(e.target.value);
  }

  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }

  function toggleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="body__container">
          <div className="nav">
            <Header />
            <div className="nav-right">
              <Search
                products={items}
                value={searchValue}
                onChangeData={changingSrarchData}
              />
              <Button num={addedItems.length} click={setShowAddProducts} />
            </div>
          </div>

          {showAddProducts && (
            <AddProducts
              click={setShowAddProducts}
              items={addedItems}
              removeItem={removeItem}
              setAddedItem={setAddedItem}
            />
          )}
          <CardBody
            products={itmesFilter}
            addItem={addItem}
            removeItem={removeItem}
            addedItems={addedItems}
          />
        </div>
      ) : (
        <Login toggleLogin={toggleLogin} />
      )}
    </div>
  );
};

export default App;
