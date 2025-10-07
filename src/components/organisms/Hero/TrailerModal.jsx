import Modal from "../../atoms/Modal";
import { useQuery } from "@apollo/client/react";
import { GET_MOVIE_VIDEOS } from "../../../lib/queries";

export default function TrailerModal({ open, onClose, movie }) {
  const { data: videoData, loading } = useQuery(GET_MOVIE_VIDEOS, {
    variables: { movieId: movie?.id },
    skip: !movie?.id,
  });

  const trailer = videoData?.getMovieVideos?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const videoUrl = trailer?.key
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0`
    : "";

  return (
    <Modal open={open} onClose={onClose} title={movie?.title || "Trailer"}>
      {open && (
        <div className="relative block w-full h-full overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : videoUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title={movie?.title || "Trailer"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full rounded-b-md"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-primary">
              No hay trailer disponible para esta película
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
