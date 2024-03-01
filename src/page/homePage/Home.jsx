import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import "../homePage/home.css";
import qr from "../../assets/image/03_Show QR.png";
import PullToRefresh from 'react-simple-pull-to-refresh';

const Home = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [point, setPoint] = useState();
  const [saldo, setSaldo] = useState();
  const [qrQode, setQrcode] = useState();
  const [banner, setBanner] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isVisible, setIsVisibe] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      changeBanner();
    }, 2000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "https://soal.staging.id/api/home",
        config
      );
      console.log(response);
      setName(response.data.result.name);
      setGreeting(response.data.result.greeting);
      setPoint(response.data.result.point);
      setSaldo(response.data.result.saldo);
      setQrcode(response.data.result.qrcode);
      setBanner(response.data.result.banner);
    } catch (error) {
      console.log("error " + error);
    }
  };

  const changeBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === banner.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleRefresh = () => {
    getData();
  };
  return (
    <>
      <PullToRefresh onRefresh={handleRefresh}>
        {isVisible ? (
          <div className="show-qr-code" onClick={() => setIsVisibe(!isVisible)}>
            <img src={qr} alt="image" />
          </div>
        ) : (
          <div className="home">
            <Header />
            <div className="hero">
              <div className="greeting shadow-sm">
                <p>{greeting}</p>
                <p>{name}</p>
                <div className="saldo">
                  <div
                    className="qr-container shadow-sm"
                    onClick={() => setIsVisibe(true)}
                  >
                    <img src={qrQode} alt="" />
                  </div>
                  <div>
                    <p>saldo Rp{saldo}</p>
                    <p>point {point}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner">
              <img src={banner[currentBannerIndex]} alt="" />
              <p>View All</p>
            </div>
            <Footer />
          </div>
        )}
      </PullToRefresh>
    </>
  );
};

export default Home;
