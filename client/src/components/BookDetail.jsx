import styles from "./BookDetail.module.css";
import {
  IoIosCloudDownload,
  IoMdThumbsUp,
  IoIosPerson,
  IoIosCalendar,
  IoIosArrowRoundBack,
  IoIosAddCircle,
} from "react-icons/io";
import { IoIosChatboxes } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import CreateCommentForm from "./CreateCommentForm";
import UpdateCommentForm from "./UpdateCommentForm";
import { useState } from "react";
function BookDetail() {
  const navigator = useNavigate();
  const [show, setShow] = useState(null);
  return (
    <div className={styles.BookDetailwrapper}>
      <div className={styles.BookDetail}>
        <figure className={styles.BookDetailFigure}>
          <img
            src="https://www.elocalshops.com/cdn/shop/products/IMG_20210709_132845_512x759.jpg?v=1625817588"
            alt="bookImg"
          />
        </figure>
        <div>
          <h3 className={styles.BookDetailHead}>
            Harry Potter The Presioner of Askaban
          </h3>
          <div className={styles.meta}>
            <button className={styles.btn}>
              <IoIosPerson className={styles.icon} />
              <span>J K Rollwing</span>
            </button>
            <p>
              <IoIosCalendar className={styles.icon} />
              <span>ReleasedYear:1995</span>
            </p>
            <p>
              <IoMdThumbsUp className={styles.icon} />
              <span>Likes:2873</span>
            </p>
          </div>
          <div className={styles.genrebox}>
            <span>genre:</span>
            <div>
              <span>Horror </span>
              <span>adventue </span>
              <span>Thriller </span>
            </div>
          </div>
          <div className={styles.about}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod hic
            quo neque quasi voluptates nostrum debitis velit excepturi eaque
            quis iste repudiandae, obcaecati ipsa voluptate accusamus dolorum ad
            amet sunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Eveniet odio, consequuntur amet assumenda dolorem praesentium magnam
            beatae nisi at eius eum nostrum animi delectus consequatur possimus
            ipsa vel? Ab, vero?Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ratione incidunt quis ipsa possimus, labore illo
            accusamus reiciendis, ut adipisci doloribus distinctio provident
            quas. Quam harum eligendi fugit numquam cumque minus?
          </div>
          <div className={styles.btnbox}>
            <button className={styles.btn}>
              <IoIosCloudDownload className={styles.icon} />
              <span>Download</span>
            </button>
            <button
              className={styles.btn}
              onClick={() => {
                if (show === "comment") {
                  setShow(null);
                } else {
                  setShow("comment");
                }
              }}
              style={
                show === "comment"
                  ? {
                      backgroundColor: "#ff385c",
                      color: "white",
                      border: "none",
                    }
                  : {}
              }
            >
              <IoIosChatboxes
                className={styles.icon}
                style={show === "comment" ? { color: "#fff" } : {}}
              />{" "}
              <span>Comments</span>
            </button>
            <button
              className={styles.btn}
              onClick={() => {
                if (show === "create") {
                  setShow(null);
                } else {
                  setShow("create");
                }
              }}
              style={
                show === "create"
                  ? {
                      backgroundColor: "#ff385c",
                      color: "white",
                      border: "none",
                    }
                  : {}
              }
            >
              <IoIosAddCircle
                className={styles.icon}
                style={show === "create" ? { color: "#fff" } : {}}
              />{" "}
              <span>Add Comment</span>
            </button>
          </div>
        </div>
        <button
          className={styles.backbtn}
          onClick={() => {
            navigator(-1);
          }}
        >
          <IoIosArrowRoundBack className={styles.icon} />
        </button>
        {show == "create" ? <CreateCommentForm setShow={setShow} /> : null}
        {show == "update" ? <UpdateCommentForm setShow={setShow} /> : null}
        {show == "comment" ? <Comments setShow={setShow} /> : null}
      </div>
    </div>
  );
}

export default BookDetail;
