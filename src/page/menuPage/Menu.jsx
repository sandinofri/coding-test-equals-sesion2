import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import "../../page/menuPage/menu.css";
import axios from "axios";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState([]);
  const requestData = {
    show_all: 1,
  };

  useEffect(() => {
    getMenu();
  }, []);
  const getMenu = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "https://soal.staging.id/api/menu",
        requestData,
        config
      );
      console.log(response);
      setCategories(response.data.result.categories);
    } catch (error) {
      console.log("error " + error);
    }
  };

  console.log(categories);
  return (
    <>
      <div className="menu shadow-sm">
        <div className="header-menu">
          <h1 className="text-center">Menu</h1>
          <div className="category-link">
            {categories.map((categoryLink) => (
              <a href="">{categoryLink.category_name}</a>
            ))}
          </div>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <div key={category.category_name} className="category">
              <h2 className="mb-2 category-name">{category.category_name}</h2>
              <div className="menu-list">
                {category.menu.map((menuItem) => (
                  <div key={menuItem.name} className="menu-item ">
                    <div className="menu-image">
                      <img src={menuItem.photo} alt={menuItem.name} />
                    </div>
                    <div>
                      <h3 className="menu-title">{menuItem.name}</h3>
                      <p className="desc">{menuItem.description}</p>
                    </div>
                    <p className="price"> {menuItem.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Menu;
