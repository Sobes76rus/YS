// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import Lightbox from "react-image-lightbox";
// import { Row, Col, Button, Container } from "reactstrap";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
// SwiperCore.use([Pagination, Navigation, Thumbs]);

// const SwiperGallery = ({ data, vertical }) => {
//   const [lightBoxOpen, setLightBoxOpen] = useState(false);
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [activeImage, setActiveImage] = useState(0);

//   const onClick = (index) => {
//     setActiveImage(index);
//     setLightBoxOpen(!lightBoxOpen);
//   };

//   // let sliderColumns = { xs: 12 },
//   //   sliderClass = "detail-carousel",
//   //   thumbsColumns = { xs: 12 },
//   //   thumbsClass = "";

//   // if (vertical) {
//   //   sliderColumns = { xs: 12, md: 10 };
//   //   (sliderClass = "order-md-2 order-sm-1"), (thumbsColumns = { md: 4 });
//   //   thumbsClass = "d-flex flex-row pr-0 order-md-1 align-self-start vertical";
//   // }

//   const sliderParams = {
//     slidesPerView: 1,
//     spaceBetween: 0,
//     loop: true,

//     onSwiper: setThumbsSwiper,
//   };

//   const customStyles = {
//     overlay: {
//       zIndex: "2000",
//     },
//     bodyOpen: {
//       position: "fixed",
//     },
//     navButtonNext: {
//       color: "black",
//     },
//   };
//   return (
//     <Container>
//       <Row className="d-flex flex-sm-column-reverse">
//         <Col className="order-md-2 order-sm-1 px-0">
//           <Swiper {...sliderParams} thumbs={{ swiper: thumbsSwiper }}>
//             {data.photo.map((slide, index) => {
//               return (
//                 <SwiperSlide
//                   key={index}
//                   className="detail-full align-self-center"
//                 >
//                   <Image
//                     onClick={() => onClick(index)}
//                     className="cursor-pointer"
//                     src={slide.url}
//                     width={slide.width}
//                     height={slide.height}
//                   />
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </Col>
//         <Swiper
//           onSwiper={setThumbsSwiper}
//           spaceBetween={10}
//           slidesPerView={4}
//           freeMode={true}
//           watchSlidesVisibility
//           watchSlidesProgress
//           className="w-50 d-flex ml-0 pt-3"
//         >
//           {data.photo.map((slide, index) => (
//             <SwiperSlide className="detail-thumb-item active mb-3" key={index}>
//               <Image
//                 className="img-fluid mb-3"
//                 src={slide.url}
//                 alt={slide.alt}
//                 width={slide.width}
//                 height={slide.height}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {/* <Swiper
//           thumbs={{ swiper: thumbsSwiper }}
//           className={thumbsClass}
//           {...thumbsColumns}
//         >
//           {data.photo.map((slide, index) => (
//             <button
//               key={index}
//               onClick={() => slideTo(index)}
//               className={`detail-thumb-item mb-3 ${
//                 activeSlide === index ? "active" : ""
//               }`}
//             >
//               <img className="img-fluid" src={slide.url} alt={slide.alt} />
//             </button>
//           ))}
//         </Swiper> */}

//         {lightBoxOpen && (
//           <Lightbox
//             mainSrc={data.photo[activeImage].url}
//             nextSrc={data.photo[(activeImage + 1) % data.photo.length].url}
//             prevSrc={
//               data.photo[
//                 (activeImage + data.photo.length - 1) % data.photo.length
//               ].url
//             }
//             onMovePrevRequest={() =>
//               setActiveImage(
//                 (activeImage + data.photo.length - 1) % data.photo.length
//               )
//             }
//             onMoveNextRequest={() =>
//               setActiveImage((activeImage + 1) % data.photo.length)
//             }
//             onCloseRequest={() => setLightBoxOpen(false)}
//             imageCaption={data.photo[activeImage].caption}
//             enableZoom={false}
//             reactModalStyle={customStyles}
//             className="btn-purple"
//           />
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default SwiperGallery;

import React, { useState, useRef } from "react";
import Image from "next/image";
import Lightbox from "react-image-lightbox";
import { Row, Col, Button } from "reactstrap";

import { Swiper, SwiperSlide } from "swiper/react";

const SwiperGallery = ({ data, vertical }) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const gallerySwiperRef = useRef(null);

  const slideTo = (index) => {
    setActiveSlide(index);
    if (
      gallerySwiperRef.current !== null &&
      gallerySwiperRef.current.swiper !== null
    ) {
      gallerySwiperRef.current.swiper.slideToLoop(index);
    }
  };

  const onClick = (index) => {
    setActiveImage(index);
    setLightBoxOpen(!lightBoxOpen);
  };

  let sliderColumns = { xs: 12 },
    sliderClass = "detail-carousel",
    thumbsColumns = { xs: 12 },
    thumbsClass = "";

  if (vertical) {
    sliderColumns = { xs: 10, md: 10 };
    (sliderClass = "detail-carousel px-0 order-md-1"),
      (thumbsColumns = { md: 4, xs: 4 });
    thumbsClass = "d-flex flex-row px-0 order-md-2 ";
  }

  const sliderParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    on: {
      slideChange: () =>
        setActiveSlide(gallerySwiperRef.current.swiper.realIndex),
    },
  };

  const customStyles = {
    overlay: {
      zIndex: "1000",
    },
    bodyOpen: {
      position: "fixed",
    },
  };

  return (
    <>
      <Row className="flex-column align-items-center">
        <Col className={sliderClass} {...sliderColumns}>
          <Swiper {...sliderParams} ref={gallerySwiperRef}>
            {data.photo.map((item, index) => (
              <SwiperSlide
                className="align-self-center"
                key={index}
                onClick={() => onClick(index)}
              >
                <Image
                  onClick={() => onClick(index)}
                  className="cursor-pointer"
                  src={item.url}
                  width={item.width}
                  height={item.height}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>

        <Col className={thumbsClass} {...thumbsColumns}>
          {data.photo.length > 1 &&
            data.photo.map((item, index) => (
              <button
                key={index}
                onClick={() => slideTo(index)}
                className={`detail-thumb-item mb-1 mr-1 ${
                  activeSlide === index ? "active" : ""
                }`}
              >
                <img className="img-fluid" src={item.url} alt={item.alt} />
              </button>
            ))}
        </Col>

        {lightBoxOpen && (
          <Lightbox
            mainSrc={data.photo[activeImage].url}
            nextSrc={data.photo[(activeImage + 1) % data.photo.length].url}
            prevSrc={
              data.photo[
                (activeImage + data.photo.length - 1) % data.photo.length
              ].url
            }
            onMovePrevRequest={() =>
              setActiveImage(
                (activeImage + data.photo.length - 1) % data.photo.length
              )
            }
            onMoveNextRequest={() =>
              setActiveImage((activeImage + 1) % data.photo.length)
            }
            onCloseRequest={() => setLightBoxOpen(false)}
            imageCaption={data.photo[activeImage].caption}
            enableZoom={false}
            reactModalStyle={customStyles}
          />
        )}
      </Row>
    </>
  );
};

export default SwiperGallery;
