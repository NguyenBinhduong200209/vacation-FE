import React, { useState, useEffect } from "react";
import axiosClient from "~/api/axiosClient";
import "./Slider.css";
import { useSearchParams } from "react-router-dom";

const Slider = () => {
  const [active, setActive] = useState(0);

  const [img, setImg] = useState([]);
  const cardCount = img.length;
  const [searchParams] = useSearchParams();
  const dataId = Object.fromEntries([...searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchImg = await axiosClient.get(`vacation/${dataId.id}/images`);
        setImg(fetchImg.data.data);
        console.log(fetchImg);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataId.id]);

  // console.log(fetchImg, img);
  //   const [searchParam] = useSearchParams();

  //   const title = searchParam.get("title");
  //   const vacationId = searchParam.get("id");

  const prevSlide = () => {
    setActive((active - 1 + cardCount) % cardCount);
  };

  const nextSlide = () => {
    setActive((active + 1) % cardCount);
  };

  useEffect(() => {
    updateCarousel();
  }, [active]);

  const updateCarousel = () => {
    const cardContainers = document.querySelectorAll(".card-container");

    cardContainers.forEach((container, i) => {
      const offset = ((active - i) % cardCount) / 3;
      const direction = Math.sign(active - i);
      const absOffset = Math.abs(active - i) / 3;
      const isActive = i === active ? 1 : 0;
      const opacity = Math.abs(active - i) <= 1 ? 1 : 0;

      container.style.setProperty("--offset", offset);
      container.style.setProperty("--direction", direction);
      container.style.setProperty("--abs-offset", absOffset);
      container.style.setProperty("--active", isActive);
      container.style.setProperty("--opacity", opacity);
    });
  };

  return (
    <div>
      <div className="carousel">
        {img.map((img) => (
          <div className="card-container">
            <div className="card">
              <img key={img._id} src={img?.path} alt="?" />
            </div>
            <button>chọn cái này nhé bạn ơi</button>
          </div>
        ))}

        <button className="nav left" onClick={prevSlide}>
          <div className="bi bi-chevron-left">trai</div>
        </button>
        <button className="nav right" onClick={nextSlide}>
          <div className="bi bi-chevron-right">phai</div>
        </button>
      </div>
    </div>
  );
};

export default Slider;
