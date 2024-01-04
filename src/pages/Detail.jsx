import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box2Fill,
  CaretLeftFill,
  CaretRightFill,
  CheckCircleFill,
  ClockFill,
} from "react-bootstrap-icons";

import GrayBanner from "../components/GrayBanner";
import { FacebookIcon, PinterestIcon, TelegramIcon, XIcon } from "react-share";

const RelatedProducts = lazy(() => import("../components/RelatedProducts.jsx"));

const Detail = () => {
  //state thông tin chi tiết của sản phẩm
  const [pd, setPd] = useState({});
  //state danh sách sản phẩm cùng chung danh mục
  const [pds, setPds] = useState([]);
  //state ảnh lớn
  const [selectedImg, setSelectedImg] = useState("");
  //state số lượng sản phẩm mà người dùng muốn mua
  const [quan, setQuan] = useState(1);

  const navigate = useNavigate();
  const params = useParams();
  //hàm lấy thông tin chi tiết của sản phẩm, và danh sách sản phẩm cùng chung danh mục
  const fetchDetail = useCallback(() => {
    const id = params.id;
    fetch(`${process.env.REACT_APP_BACKEND}/products/detail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.err) {
          if (data.message === "Found no") {
            navigate("/123");
          } else {
            setPd(data.pd);
            setPds(data.pds);
            setSelectedImg(data.pd.imgs[0]);
            // console.log(data.pd, data.pds);
          }
        } else {
          navigate("/server-error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => fetchDetail(), [fetchDetail]);

  //hàm thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        productId: pd._id,
        quan: quan,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.err) {
          if (data.msg === "Added!") {
            alert("Added!");
          } else if (data.msg === "have not been logged in yet") {
            navigate("/login");
          }
        } else {
          navigate("/server-error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <GrayBanner title="Detail" />
      {pd.name && (
        <div>
          <div className="d-flex my-4">
            <div className="col-2">
              <div>
                {pd.imgs.map((img) => (
                  <img
                    className="d-block my-2"
                    width="26%"
                    onClick={() => setSelectedImg(img)}
                    style={{ cursor: "pointer" }}
                    key={Math.random() * 5}
                    src={`${process.env.REACT_APP_BACKEND}/${img}`}
                    alt=""
                  />
                ))}
              </div>
              <div>
                <FacebookIcon
                  size={32}
                  round="true"
                  style={{ cursor: "pointer" }}
                />
                <TelegramIcon
                  size={32}
                  round="true"
                  style={{ cursor: "pointer", margin: "0 0.5rem" }}
                />
                <PinterestIcon
                  size={32}
                  round="true"
                  style={{ cursor: "pointer" }}
                />
                <XIcon
                  size={32}
                  round="true"
                  style={{ cursor: "pointer", margin: "0 0.5rem" }}
                />
              </div>
            </div>
            <div className="col-4">
              <img
                src={`${process.env.REACT_APP_BACKEND}/${selectedImg}`}
                alt=""
              />
            </div>
            <div className="col-6" key={pd._id}>
              <h3>{pd.name}</h3>
              <p className="my-3" style={{ color: "gray", fontSize: "1.1rem" }}>
                ${pd.price}
              </p>
              <p>{pd.short_desc}</p>
              <h6>
                TYPE:{" "}
                <span style={{ color: "gray", fontWeight: "400" }}>
                  {pd.type}
                </span>
              </h6>
              <div className="my-3 d-flex">
                <div
                  className="py-2 d-flex"
                  style={{ border: "0.05rem gray solid" }}
                >
                  <input
                    onChange={(e) => {
                      e.target.value === ""
                        ? setQuan(1)
                        : setQuan(Number(e.target.value));
                    }}
                    className="px-2 col-8 border-0"
                    type="number"
                    placeholder="QUANTITY"
                    min="1"
                  />
                  <div className="col-4 d-flex justify-content-around align-items-center">
                    <CaretLeftFill
                      onClick={() => {
                        if (quan > 1) {
                          setQuan((prevState) => prevState - 1);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <div>{quan}</div>
                    <CaretRightFill
                      onClick={() => setQuan((prevState) => prevState + 1)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <button
                  onClick={addToCart}
                  className="py-2"
                  style={{
                    padding: "0 1rem",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  Add to cart
                </button>
              </div>
              <div>
                <CheckCircleFill
                  style={{ marginRight: "0.5rem", color: "green" }}
                />{" "}
                Top drinks
              </div>
              <div>
                <Box2Fill style={{ marginRight: "0.5rem", color: "blue" }} />{" "}
                Free shipping nationwide for all orders of $75 or more
              </div>
              <div>
                <ClockFill style={{ marginRight: "0.5rem", color: "orange" }} />{" "}
                24 X 7 Service
              </div>
            </div>
            <div></div>
          </div>
          <div className="my-5">
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "0.5rem 1rem",
                cursor: "default",
              }}
            >
              DESCRIPTION
            </button>
            <p className="col-6 my-3">{pd.long_desc}</p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <RelatedProducts pds={pds} />
          </Suspense>
        </div>
      )}
    </Container>
  );
};

export default Detail;
