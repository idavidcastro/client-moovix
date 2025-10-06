import { useQuery } from "@apollo/client/react";
import { GET_POPULAR_MOVIES } from "../../lib/queries";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Btn from "../atoms/Btn";
import { useState } from "react";
import Modal from "../atoms/Modal";
import AddListBtn from "../atoms/AddListBtn";

export default function Hero() {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);
  const [open, setOpen] = useState(false);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢: {error.message}</p>;

  return (
    <section className="w-full h-screen">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        slidesPerView={1}
        mousewheel={true}
        cssMode={true}
        centeredSlides
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation, Autoplay]}
      >
        {data.popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-screen">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/100 to-transparent" />
              </div>
              <div className="absolute z-20 left-6 md:left-16 bottom-20 md:bottom-28 text-primary">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-primary/10 border border-secondary rounded-full px-2 py-1 shadow-sm">
                    <Star className="w-3 h-3 text-secondary mr-1" />
                    <span className="text-xs font-semibold text-secondary">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-secondary/80 uppercase tracking-wider">
                      {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString(
                            "es-ES",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "Fecha N/A"}
                    </span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                  {movie.title}
                </h2>
                <p className="max-w-lg mt-4 text-sm md:text-base text-third/90 line-clamp-3">
                  {movie.overview}
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <Btn
                    name="► Ver trailer"
                    onClick={() => setOpen(true)}
                    className="gap-3 px-5 py-3 font-semibold transition rounded-md shadow-md cursor-pointer bg-secondary text-primary hover:bg-secondary/90"
                  />
                  <AddListBtn movie={movie} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal open={open} onClose={() => setOpen(false)}>
        {open && (
          <div className="relative block w-full h-full overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/vMLk_T0PPbk?si=_HVWLdbgx4dC7Wvv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerpolicy="strict-origin-when-cross-origin"
              className="w-full h-full rounded-b-sm"
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
