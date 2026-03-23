import React from "react";

const images = [
  "/images/thumbsup/thumbsup-1.png",
  "/images/thumbsup/thumbsup-2.png",
  "/images/thumbsup/thumbsup-3.png",
];

export default function ThumbsUpGallery() {
  return (
    <section style={styles.wrapper}>
      {images.map((src, index) => (
        <div key={index} style={styles.block}>
          <img src={src} alt="" style={styles.image} />
        </div>
      ))}
    </section>
  );
}

const styles = {
  wrapper: {
    background: "#000",
  },
  block: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    maxWidth: "1400px",
    objectFit: "contain",
  },
};
