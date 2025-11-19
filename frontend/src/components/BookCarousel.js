// // src/components/BookCarousel.js (adaptado para Swiper 10+)
// import React from "react";
// import PropTypes from "prop-types";
// import { Swiper, SwiperSlide } from "swiper/react";
// // módulos siguen viniendo de 'swiper' normalmente
// import { Navigation, Pagination, lazy } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// // atención: en Swiper v10+ el css de lazy está en modules:
// // import "swiper/modules/lazy/lazy.css";

// import BookCard from "./BookCard";
// // import "../styles/components/bookcarousel.css";

// export default function BookCarousel({ books = [] }) {
//   if (!books || books.length === 0) return null;

//   return (
//     <div className="book-carousel-wrapper">
//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={16}
//         navigation
//         loop={true}
//         // pagination={{ clickable: true }}
//         lazy={true}
//         preloadImages={false}
//         breakpoints={{
//           320: { slidesPerView: 2.2 },
//           576: { slidesPerView: 4.2 },
//           768: { slidesPerView: 5.2 },
//           992: { slidesPerView: 5.2 },
//           1200: { slidesPerView: 5.2 },
//         }}
//       >
//         {books.map((book) => (
//           <SwiperSlide key={book.id ?? book.slug}>
//             <div className="carousel-slide">
//               <BookCard book={book} />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// BookCarousel.propTypes = {
//   books: PropTypes.array,
// };


import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BookCard from "./BookCard";
import BookPlaceholder from "./BookPlaceholder";

export default function BookCarousel({ books = [], loading = false, placeholderCount = 6 }) {
  // Si no hay libros y no se está cargando -> no renderizar
  if ((!books || books.length === 0) && !loading) return null;

  const slidesSource = loading ? Array.from({ length: placeholderCount }) : books;

  return (
    <div className="book-carousel-wrapper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        navigation
        loop={!loading}           // evita comportamiento raro cuando hay placeholders
        preloadImages={false}
        breakpoints={{
          320: { slidesPerView: 2.2 },
          576: { slidesPerView: 4.2 },
          768: { slidesPerView: 5.2 },
          992: { slidesPerView: 5.2 },
          1200: { slidesPerView: 5.2 },
        }}
      >
        {slidesSource.map((item, idx) => (
          <SwiperSlide key={loading ? `ph-${idx}` : item.id ?? item.slug ?? idx}>
            <div className="carousel-slide">
              {loading ? <BookPlaceholder /> : <BookCard book={item} />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

BookCarousel.propTypes = {
  books: PropTypes.array,
  loading: PropTypes.bool,
  placeholderCount: PropTypes.number,
};

