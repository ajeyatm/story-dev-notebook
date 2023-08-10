import styles from "./styles.module.css";

const ImageWrapper = ({
  alt,
  src,
  banner,
}: {
  alt: string;
  src: string;
  banner?: boolean;
}) => {
  return (
    <img
      alt={alt}
      className={styles[banner ? "notebook_banner_img" : "notebook__card__img"]}
      src={src}
    />
  );
};

export default ImageWrapper;
