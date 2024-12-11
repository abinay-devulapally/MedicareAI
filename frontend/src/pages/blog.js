import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.body.appendChild(script);
      document.body.removeChild(script);
    });
  };

  useEffect(() => {
    loadScript(`${process.env.PUBLIC_URL}js/main.js`);
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <section className="home-slider owl-carousel">
        <div
          className="slider-item bread-item"
          style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay" />
          <div className="container">
            <div className="row slider-text align-items-end">
              <div className="col-md-7 col-sm-12 ftco-animate mb-5">
                <p className="breadcrumbs">
                  <span>
                    <a href="/">Home</a>
                  </span>{" "}
                  <span>Blog</span>
                </p>
                <h1 className="mb-3 navbar-brand">
                  Explore Our{" "}
                  <span style={{ color: "#009efb", fontWeight: "bold" }}>
                    Blogs
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog, index) => (
                    <div key={index} className="col-md-12 ftco-animate">
                      <div className="blog-entry">
                        <Link
                          to={`/blog-details/${blog._id}`}
                          className="block-20"
                          style={{ backgroundImage: `url(${blog.picture})` }}
                        ></Link>
                        <div className="text d-flex py-4">
                          <div className="meta mb-3">
                            <div>
                              <span className="icon-calendar" />{" "}
                              {blog.date || "October 10, 2023"}
                            </div>
                            <div>
                              <span className="icon-person" /> Admin
                            </div>
                          </div>
                          <div className="desc pl-sm-3 pl-md-5">
                            <h3>
                              <Link to={`/blog-details/${blog._id}`}>
                                {blog.title}
                              </Link>
                            </h3>
                            <p>
                              {blog.description.substr(0, 250)}
                              <span style={{ fontSize: "15px" }}>...</span>
                            </p>
                            <Link
                              to={`/blog-details/${blog._id}`}
                              className="btn btn-primary btn-outline-primary"
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No blogs available.</p>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="sidebar-box">
                <form className="search-form">
                  <div className="form-group">
                    <span className="icon fa fa-search" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search blogs..."
                      onChange={handleSearchChange}
                    />
                  </div>
                </form>
              </div>
              <div className="sidebar-box">
                <h3>Categories</h3>
                <ul className="categories">
                  <li>
                    <a href="#">
                      Technology <span>(10)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Healthcare <span>(15)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      AI Solutions <span>(20)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Innovation <span>(8)</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="sidebar-box">
                <h3>Recent Blogs</h3>
                <div className="block-21 mb-4 d-flex">
                  <a
                    className="blog-img mr-4"
                    style={{ backgroundImage: "url(images/recent_blog1.jpg)" }}
                  ></a>
                  <div className="text">
                    <h3>
                      <a href="#">Latest Trends in AI for Healthcare</a>
                    </h3>
                    <div className="meta">
                      <div>
                        <span className="icon-calendar" /> November 5, 2023
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                  <a
                    className="blog-img mr-4"
                    style={{ backgroundImage: "url(images/recent_blog2.jpg)" }}
                  ></a>
                  <div className="text">
                    <h3>
                      <a href="#">How Machine Learning is Changing Medicine</a>
                    </h3>
                    <div className="meta">
                      <div>
                        <span className="icon-calendar" /> October 28, 2023
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Blog;
