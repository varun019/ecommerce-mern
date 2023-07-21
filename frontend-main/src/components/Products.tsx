import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Navbar1 from "./Navbar1";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { productContext } from "./Context";
import ReactPaginate from "react-paginate";
import Pagination from "react-bootstrap/Pagination";
import queryString from "query-string";
import "./Pagination.css";
import { debounce } from "debounce";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  total: number;
  quantity: number;
}

interface CategoryItem {
  _id: string;
  isChecked: boolean;
}

function Products() {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  let arr: CategoryItem[] = [];
  const { search, pathname } = useLocation();
  const { page } = queryString.parse(search) as { page: string };
  const { cartCount, updateCartCount}: any = useContext(productContext);
  const [product, setProduct] = useState<Product[]>([]);
  const [currentqueries, setCurrentQueries] = useState({ skip: 0, limit: 5 });
  const [queryCategory, setQueryCategory] = useState<string[]>([]);
  const [querySearch, setQuerySearch] = useState<string | null>(null);
  const [categoryKey, setCategoryKey] = useState<CategoryItem[]>([]);
  const [pageCounter, setPageCounter] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  let pageCount: any = Math.ceil(pageCounter / currentqueries.limit);
  
  useEffect(() => {
    (async () => {
      let ar: string[] = [];
      if (page) {
        currentqueries.skip = (Number(page) - 1) * currentqueries.limit;
      }
      if (categoryKey.length > 0) {
        ar = categoryKey
          .filter((item) => item.isChecked)
          .map((item) => item._id);
      }
      const queryStringParams = queryString.stringify({
        skip: currentqueries.skip,
        limit: currentqueries.limit,
        category: ar.join(","),
        key: querySearch || "",
      });
      const result = await axios.get(
        `http://localhost:8080/AllDataWithFilterAndPagination?${queryStringParams}`
      );
      setPageCounter(result.data.totalRecords);
      setProduct(result.data.data);
      const allCategory = result.data.categoryList.map((r: CategoryItem) => {
        const find = categoryKey.find((t) => t._id === r._id);
        if (find) {
          return { ...find };
        } else {
          return { ...r, isChecked: false };
        }
      });
      setCategoryList(allCategory);
    })();
  }, [currentqueries, categoryKey, page, querySearch]);

  const changePage = useCallback(
    ({ selected }: { selected: number }) => {
      setCurrentQueries((prevQueries) => ({
        ...prevQueries,
        skip: selected * prevQueries.limit,
      }));
    },
    []
  );

  const debouncedSave = useCallback(
    debounce((keyData: any) => setQuerySearch(keyData), 1000),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    debouncedSave(key);
  };

  const handleCheckboxChange = (categoryId: string) => {
    setCategoryKey((prevKeys) =>
      prevKeys.map((key) =>
        key._id === categoryId ? { ...key, isChecked: !key.isChecked } : key
      )
    );
  };

  const addToCart = async (product: Product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;
  
    try {
      const cartItem = {
        userId: userId,
        productId: product._id,
        quantity: 1,
        price: product.price,
        total: product.price, // Initialize the total with the product price
        name: product.name,
      };
  
      await axios.post("http://localhost:8080/cart", { cartItems: [cartItem] });
  
      // const savedCartItems = response.data.data;

      toast.success("Item added to the cart successfully!");
      const updatedCartCount = cartCount + 1;

      updateCartCount(updatedCartCount);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add the item to the cart");
    }
  };
  

  return (
    <div className="container">
      <Navbar1 />
      <h1>Our Products</h1>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="w-25"
          aria-label="Search"
          style={{ position: "relative", left: "10px" }}
          onChange={handleSearch}
        />
      </Form>
      <Container>
        <Row>
          {product.length > 0 ? (
            <>
              {product.map((product, key) => (
                <div className="col-sm-4" key={key}>
                  <div className="my-3">
                    <Card>
                      <div className="p-3">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          Name: {product.name}
                        </ListGroup.Item>
                        <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                        <ListGroup.Item>Category: {product.category}</ListGroup.Item>
                        <ListGroup.Item>
                          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                </div>
              ))}
              <Pagination>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                  forcePage={page ? Number(page) - 1 : 0}
                  renderOnZeroPageCount={null}
                />
              </Pagination>
            </>
          ) : (
            <h2>No products found</h2>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Products;