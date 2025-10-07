import Modal from "../../atoms/Modal";

export default function TrailerModal({ open, onClose, movie }) {
  // If you have a real trailer key, build the URL dynamically.
  const src = movie
    ? "https://www.youtube.com/embed/vMLk_T0PPbk?si=_HVWLdbgx4dC7Wvv"
    : "";

  return (
    <Modal open={open} onClose={onClose}>
      {open && (
        <div className="relative block w-full h-full overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={src}
            title={movie?.title || "Trailer"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full rounded-b-md"
          />
        </div>
      )}
    </Modal>
  );
}
