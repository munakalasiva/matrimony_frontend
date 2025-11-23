import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import blog1 from "../assets/contact_Img.jpg";
import blog2 from "../assets/banner.jpg";

const blogs = [
  {
    id: 1,
    title: "Arjun & Kavya's Traditional Mumbai Wedding",
    image: blog1,
    description:
      "A beautiful blend of classical traditions and modern elegance. Their love story began with shared melodies and culminated in a spectacular celebration.",
    category: "Traditional Wedding",
    date: "December 2023",
  },
  {
    id: 2,
    title: "Ravi & Meera's Adventure-Filled Journey",
    image: blog2,
    description:
      "From mountain peaks to beach shores, this couple's pre-wedding adventures created memories that lasted a lifetime.",
    category: "Destination Wedding",
    date: "August 2023",
  },
  {
    id: 3,
    title: "Pradeep & Anjali's Tech-Savvy Romance",
    image:
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
    description:
      "Two software engineers who discovered they worked just kilometers apart but never met until our platform connected them.",
    category: "Modern Love",
    date: "February 2024",
  },
  {
    id: 4,
    title: "Vikash & Pooja's Cultural Fusion Celebration",
    image: blog1,
    description:
      "A stunning fusion of North and South Indian traditions created the most vibrant and colorful celebration.",
    category: "Fusion Wedding",
    date: "November 2023",
  },
  {
    id: 5,
    title: "Rohit & Sneha's Garden Paradise Wedding",
    image: blog2,

    description:
      "Surrounded by blooming flowers and nature's beauty, this couple exchanged vows in an enchanted garden setting.",
    category: "Garden Wedding",
    date: "March 2024",
  },
  {
    id: 6,
    title: "Amit & Divya's Royal Palace Affair",
    image:
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
    description:
      "A majestic celebration in a heritage palace with royal grandeur. Their love story unfolded like a fairy tale.",
    category: "Royal Wedding",
    date: "January 2024",
  },
];

const BlogSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Wedding Moments</h1>
        <p style={styles.subtitle}>
          Discover inspiring wedding stories and beautiful celebrations from
          real couples who found their soulmates
        </p>
      </div>

      <Slider {...settings}>
        {blogs.map((blog) => (
          <div key={blog.id} style={{ padding: "0 10px" }}>
            <div style={styles.blogCard}>
              <div style={styles.imageContainer}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={styles.blogImage}
                />
                <div style={styles.imageOverlay}>
                  <span style={styles.category}>{blog.category}</span>
                  <span style={styles.date}>{blog.date}</span>
                </div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.blogTitle}>{blog.title}</h3>
                <p style={styles.blogDescription}>{blog.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "50px 20px",
    fontFamily: "'Georgia', serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "400",
    color: "rgb(139, 69, 19)",
  },
  subtitle: {
    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
    fontWeight: "400",
    color: "#444",
  },
  blogCard: {
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    margin: "20px",
  },
  imageContainer: {
    position: "relative",
    height: "250px",
    overflow: "hidden",
  },
  blogImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
    color: "white",
    fontSize: "0.9rem",
  },
  category: {
    background: "#FFD700",
    color: "#8B0000",
    padding: "5px 10px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  date: {
    background: "rgba(255,255,255,0.9)",
    color: "#8B0000",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  cardContent: {
    padding: "20px",
    height: "200px",
  },
  blogTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#8B0000",
  },
  blogDescription: {
    fontSize: "0.95rem",
    lineHeight: "1.5",
    color: "#333",
  },
};

export default BlogSlider;
