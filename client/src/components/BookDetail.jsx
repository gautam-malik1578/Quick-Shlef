import styles from "./BookDetail.module.css";
import loginAnnimation from "../annimations/Loading.json";
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
import { useGetBookDetail } from "../hooks/useBookDetail";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { searchTypeToAuthor, setSearchString } from "../slices/searchSlice";
function BookDetail() {
  const navigator = useNavigate();
  const { data, isLoading } = useGetBookDetail();
  const [show, setShow] = useState(null);
  const dispatch = useDispatch();
  function handleSearchAuthor() {
    dispatch(searchTypeToAuthor());
    dispatch(setSearchString({ searchString: data.data.book.author }));
    navigator("/");
  }
  return (
    <div className={styles.BookDetailwrapper}>
      {isLoading && (
        <div className={styles.annimationbox}>
          <Loader
            height={100}
            width={100}
            anni={loginAnnimation}
            text="loading..."
          />
        </div>
      )}
      {!isLoading && data?.data.book != null && (
        <div className={styles.BookDetail}>
          <figure className={styles.BookDetailFigure}>
            <img src={data.data.book.imgUrl} alt="bookImg" />
          </figure>
          <div>
            <h3 className={styles.BookDetailHead}>{data.data.book.title}</h3>
            <div className={styles.meta}>
              <button
                className={styles.btn}
                onClick={() => handleSearchAuthor()}
              >
                <IoIosPerson className={styles.icon} />
                <span>{data.data.book.author}</span>
              </button>
              <p>
                <IoIosCalendar className={styles.icon} />
                <span>ReleasedYear: {data.data.book.releasedYear}</span>
              </p>
              <p>
                <IoMdThumbsUp className={styles.icon} />
                <span>Likes: {data.data.book.likes}</span>
              </p>
            </div>
            <div className={styles.genrebox}>
              <span>genre:</span>
              <div className={styles.genres}>
                {data.data.book.genre.map((g) => (
                  <span key={g}>{g}</span>
                ))}
              </div>
            </div>
            <div className={styles.about}>{data.data.book.about}</div>
            <div className={styles.btnbox}>
              <a
                target="_blank"
                onClick={(e) => {
                  if (!data.data.book.available) e.preventDefault();
                }}
                className={styles.Downloadbtn}
                href={`http://127.0.0.1:5000/api/v1/book/download/${data.data.book._id}`}
              >
                <IoIosCloudDownload className={styles.icon} />
                <span>
                  {data.data.book.available ? "Download" : "Not Available"}
                </span>
              </a>
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
            <IoIosArrowRoundBack className={styles.iconBack} />
          </button>
          {show == "create" ? <CreateCommentForm setShow={setShow} /> : null}
          {show == "update" ? <UpdateCommentForm setShow={setShow} /> : null}
          {show == "comment" ? <Comments setShow={setShow} /> : null}
        </div>
      )}
    </div>
  );
}

export default BookDetail;
