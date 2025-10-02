import React from "react";

export default function CardMovie({ img_path, title, classname = "" }) {
  return (
    <div className="h-auto w-full">
      <img
        src={`https://image.tmdb.org/t/p/original${img_path}`}
        alt={title}
        className={
          `object-cover w-full h-full block rounded-md aspect-auto min-h-[420px]` +
          classname
        }
      />
    </div>
  );
}
