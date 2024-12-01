import Tool from "./Tool";
import styles from "./ToolsBox.module.css";
const data = [
  {
    id: 1,
    type: "append pdf",
    url: "append-pdf",
    img: "appendpdf",
    text: "combine two pdf one after the other",
  },
  {
    id: 2,
    type: "trim pdf",
    url: "trim-pdf",
    img: "trimpdf",
    text: "remove pages from a pdf",
  },
  {
    id: 3,
    type: "img to pdf",
    url: "img-to-pdf",
    img: "imgtopdf",
    text: "convert imgs to pdf",
  },
  {
    id: 4,
    type: "lock pdf",
    url: "lock-pdf",
    img: "lockpdf",
    text: "Put password on pdf",
  },
  {
    id: 5,
    type: "png to jpg",
    url: "png-to-jpg",
    img: "pngtojpg",
    text: "convert png to jpg",
  },
  {
    id: 6,
    type: "png to webp",
    url: "png-to-webp",
    img: "pngtowebp",
    text: "convert png to webp",
  },
  {
    id: 7,
    type: "jpg to png",
    url: "jpg-to-png",
    img: "jpgtopng",
    text: "convert jpg to png",
  },
  {
    id: 8,
    type: "jpg to webp",
    url: "jpg-to-webp",
    img: "jpgtowebp",
    text: "convert jpg to webp",
  },
  {
    id: 9,
    type: "webp to jpg",
    url: "webp-to-jpg",
    img: "webptojpg",
    text: "convert webp to jpg",
  },
  {
    id: 10,
    type: "webp to png",
    url: "webp-to-png",
    img: "webptopng",
    text: "convert webp to png",
  },
];
function ToolsBox() {
  return (
    <div className={styles.toolsbox}>
      {data.map((d) => (
        <Tool data={d} key={d.id} />
      ))}
    </div>
  );
}

export default ToolsBox;
