import React, { useState } from "react";
import "./component.css";

const testimonials = [
  {
    id: 1,
    coupleNames: "Arjun & Kavya",
    location: "Mumbai, India",
    marriageDate: "December 2023",
    story:
      "We connected through your platform in March 2023. What started as simple conversations about our shared love for classical music blossomed into something beautiful. The compatibility matching was incredible - we both valued family traditions and had similar career goals. Today, we're not just husband and wife, but best friends who found each other against all odds.",
    image:
      "https://images.pexels.com/photos/14703539/pexels-photo-14703539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
    rating: 5,
    tags: ["Music Lovers", "Traditional Values", "Career Focused"],
  },
  {
    id: 2,
    coupleNames: "Ravi & Meera",
    location: "Bangalore, India",
    marriageDate: "August 2023",
    story:
      "After years of unsuccessful matches elsewhere, we almost gave up hope. But your site's advanced filtering helped us find each other based on our shared passion for travel and adventure sports. Our first conversation lasted 4 hours! We explored 3 countries together before our wedding. Thank you for helping two wandering souls find home in each other.",
    image:
      "https://images.pexels.com/photos/7741596/pexels-photo-7741596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
    rating: 5,
    tags: ["Travel Enthusiasts", "Adventure Sports", "Long Conversations"],
  },
  {
    id: 3,
    coupleNames: "Pradeep & Anjali",
    location: "Delhi, India",
    marriageDate: "February 2024",
    story:
      "Being software engineers, we were skeptical about online matrimony. But the detailed profiles and genuine verification process impressed us. We discovered we worked just 2 km apart but never met! Our shared love for technology, books, and weekend food adventures made us perfect for each other. One year married and still coding together!",
    image:
      "https://images.pexels.com/photos/14703539/pexels-photo-14703539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400",
    rating: 5,
    tags: ["Tech Professionals", "Book Lovers", "Food Adventures"],
  },
  {
    id: 4,
    coupleNames: "Vikash & Pooja",
    location: "Chennai, India",
    marriageDate: "November 2023",
    story:
      "Coming from different cultural backgrounds, we thought compatibility would be difficult. Your platform's cultural matching feature showed us how beautifully our traditions could blend. She's from North India, I'm from South - but our values aligned perfectly. Our wedding was a gorgeous fusion of both cultures, and we're expecting our first child!",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop&crop=faces",
    rating: 5,
    tags: ["Cultural Fusion", "Family Values", "Expecting Parents"],
  },
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const nextTestimonial = () => {
    setSelectedTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setSelectedTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[selectedTestimonial];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Where Love Stories Began</h1>

        {/* Where love finds its perfect story. */}
        <p style={styles.subtitle}>
          Real couples, real stories, real happiness found through our matrimony
          platform
        </p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.imageSection}>
          <div style={styles.imageContainer}>
            <img
              src={current.image}
              alt={`${current.coupleNames} - Happy Couple`}
              style={styles.coupleImage}
            />
            <div style={styles.imageOverlay}>
              <div style={styles.marriageDate}>{current.marriageDate}</div>
            </div>
          </div>
        </div>

        <div style={styles.storySection}>
          <div style={styles.storyContainer}>
            <div style={styles.quoteIcon}>"</div>
            <p style={styles.story}>{current.story}</p>
            <div style={styles.tags}>
              {current.tags.map((tag, index) => (
                <span key={index} style={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.navigation}>
        <button onClick={prevTestimonial} style={styles.navButton}>
          ← Previous Story
        </button>

        <div style={styles.indicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedTestimonial(index)}
              className="indicator-btn"
              style={{
                ...styles.indicator,
                ...(index === selectedTestimonial
                  ? styles.indicatorActive
                  : {}),
              }}
            />
          ))}
        </div>

        <button onClick={nextTestimonial} style={styles.navButton}>
          Next Story →
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "100vw",
    // margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    // background: "linear-gradient(135deg, #FFECA1 0%, #FFECA1 100%)",
    background: "#fff8ee",
    borderRadius: "20px",
    color: "#333",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "3em",
    fontWeight: "400",
    color: "rgb(139, 69, 19)",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    fontFamily: "'Georgia', serif",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#8B4513",
    fontWeight: "400",
    letterSpacing: "2px",
    marginBottom: "10px",
  },
  mainContent: {
    display: "flex",
    gap: "40px",
    alignItems: "stretch",
    marginBottom: "40px",
    background: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    minHeight: "400px",
  },
  imageSection: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: "30px",
    background: "linear-gradient(45deg, #f8f9fa, #e9ecef)",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "400px",
    borderRadiusTopLeft: "15px",
    borderRadiusBottomLeft: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    // marginBottom: "20px",
  },
  coupleImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  imageOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
    padding: "20px",
    color: "white",
  },
  marriageDate: {
    fontSize: "0.9em",
    fontWeight: "bold",
    textAlign: "right",
  },
  coupleInfo: {
    textAlign: "center",
  },
  coupleNames: {
    fontSize: "1.8em",
    fontWeight: "bold",
    color: "#2c3e50",
    margin: "0 0 10px 0",
  },
  location: {
    fontSize: "1.1em",
    color: "#7f8c8d",
    margin: "0 0 15px 0",
  },
  rating: {
    fontSize: "1.2em",
  },
  star: {
    marginRight: "2px",
  },
  storySection: {
    flex: "2",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  storyContainer: {
    position: "relative",
  },
  quoteIcon: {
    fontSize: "4em",
    color: "#667eea",
    opacity: "0.3",
    position: "absolute",
    top: "-20px",
    left: "-10px",
    fontFamily: "Georgia, serif",
  },
  story: {
    fontSize: "1.2em",
    lineHeight: "1.8",
    color: "#2c3e50",
    marginBottom: "25px",
    fontStyle: "italic",
    paddingLeft: "30px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    paddingLeft: "30px",
  },
  tag: {
    background: "linear-gradient(45deg, #667eea, #764ba2)",
    color: "white",
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "0.9em",
    fontWeight: "500",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    padding: "0 20px",
  },
  navButton: {
    background: "rgb(139, 69, 19)",
    color: "white",
    border: "2px solid rgb(139, 69, 19)",
    padding: "12px 24px",
    borderRadius: "25px",
    fontSize: "1em",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "500",
  },
  indicators: {
    display: "flex",
    gap: "10px",
  },
  indicator: {
    width: "6px !important",
    height: "6px !important",
    borderRadius: "50%",
    border: "none",
    background: "rgb(139, 69, 19)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  indicatorActive: {
    background: "rgba(107, 70, 44, 1)",
    transform: "scale(1.3)",
  },
  ctaSection: {
    textAlign: "center",
    background: "rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
  },
  ctaTitle: {
    fontSize: "2em",
    color: "white",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  ctaText: {
    fontSize: "1.1em",
    color: "rgba(255,255,255,0.9)",
    marginBottom: "25px",
  },
  ctaButton: {
    background: "linear-gradient(45deg, #ff6b6b, #ee5a52)",
    color: "white",
    border: "none",
    padding: "15px 40px",
    borderRadius: "30px",
    fontSize: "1.2em",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(255,107,107,0.4)",
  },
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement("style");
  style.textContent = `
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2) !important;
    }
    img:hover {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
};

// Call this when component mounts (in a real React app, you'd use useEffect)
setTimeout(addHoverEffects, 0);

export default Testimonials;
