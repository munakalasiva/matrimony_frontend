import React, { useState, useEffect } from "react";
import {
  Heart,
  User,
  Send,
  CheckCircle,
  Calendar,
  Users,
  UserCheck,
} from "lucide-react";

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const timelineSteps = [
    {
      id: 1,
      icon: User,
      title: "Register",
      description:
        "Create your profile and join our trusted matrimony community",
      timing: "TIMING: 2 MIN",
    },
    {
      id: 2,
      icon: CheckCircle,
      title: "Find Your Match",
      description: "Find Your dream partner from the verified profiles",
      timing: "TIMING: 1-2 DAYS",
    },
    {
      id: 3,
      icon: Send,
      title: "Send Interest",
      description:
        "Browse profiles and send interest to your potential matches",
      timing: "TIMING: 5 MIN",
    },

    {
      id: 4,
      icon: UserCheck,
      title: "Get Profile Info",
      description:
        "Exchange detailed information and get to know each other better",
      timing: "TIMING: 1 WEEK",
    },
    {
      id: 5,
      icon: Calendar,
      title: "Start Meetups",
      description: "Arrange meetings with family and begin the formal process",
      timing: "TIMING: 2-3 WEEKS",
    },
    {
      id: 6,
      icon: Heart,
      title: "Get Married",
      description:
        "Celebrate your union and start your beautiful journey together",
      timing: "TIMING: 3-6 MONTHS",
    },
  ];

  const styles = {
    container: {
      width: "100vw",
      // margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      backgroundColor: "#fff",
      minHeight: "80vh",
    },
    header: {
      textAlign: "center",
      marginBottom: "130px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(-30px)",
      transition: "all 1s ease-out",
    },
    moments: {
      fontSize: "1rem",
      color: "#8B4513",
      fontWeight: "400",
      letterSpacing: "3px",
      marginBottom: "10px",
      marginTop: "20px",
      textTransform: "uppercase",
    },
    // stepCard: {
    //   height: "150px",
    // },
    title: {
      fontSize: "3.5rem",
      fontWeight: "400",
      color: "#8B4513",
      marginBottom: "20px",
      fontFamily: "'Georgia', serif",
    },
    decorativeLine: {
      width: "120px",
      height: "2px",
      background: "linear-gradient(90deg, transparent, #8B4513, transparent)",
      margin: "20px auto",
      position: "relative",
    },
    decorativeFlower: {
      position: "absolute",
      top: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "20px",
      color: "#8B4513",
    },
    timelineContainer: {
      position: "relative",
      display: "flex",
      // flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      justifyContent: "center",
    },

    timelineStep: (index) => ({
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: "220px",
      position: "relative",
      marginBottom: "30px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(50px)",
      transition: "all 0.1s ease-out",
      transitionDelay: `${index * 0.1}s`,
      flexDirection: index % 2 === 0 ? "row" : "row-reverse",
    }),
    stepCard: (isActive, index) => ({
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: isActive
        ? "0 15px 50px rgba(139, 69, 19, 0.15)"
        : "0 8px 30px rgba(139, 69, 19, 0.08)",
      transform: isActive ? "translateY(-5px)" : "translateY(0)",
      transition: "all 0.01s ease",
      cursor: "pointer",
      width: "400px",
      border: isActive ? "2px solid #8B4513" : "1px solid #e5e5e5",
      position: "relative",
      height: "180px",
      marginBottom: "100px",
    }),
    stepIcon: (isActive) => ({
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: isActive ? "#8B4513" : "#f8f8f8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      left: "50%",
      top: "-30%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
      border: "4px solid #fff",
      boxShadow: "0 8px 25px rgba(139, 69, 19, 0.2)",
      transition: "all 0.1s ease",
      marginBottom: "30px",
    }),
    stepContent: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    stepTitle: {
      fontSize: "17px",
      fontWeight: "600",
      color: "#8B4513",
      marginBottom: "10px",
      fontFamily: "'Georgia', serif",
    },
    stepTiming: {
      fontSize: "0.9rem",
      color: "#e74c3c",
      fontWeight: "600",
      marginBottom: "15px",
      letterSpacing: "1px",
    },
    stepDescription: {
      fontSize: "13px",
      color: "#666",
      lineHeight: "1.6",
      fontWeight: "400",
    },
    connectionLine: {
      // position: "absolute",
      // left: "50%",
      // top: "0",
      // bottom: "0",
      // width: "px",
      // background: "linear-gradient(to bottom, #8B4513, #d4a574)",
      // transform: "translateX(-50%)",
      // zIndex: 1,
      position: "absolute",
      top: "-25%",
      left: "10%",
      right: "0",
      height: "4px",
      width: "80%", // thickness of line
      background: "linear-gradient(to right, #8B4513, #d4a574)",
      transform: "translateY(-50%)",
      zIndex: 0,
    },
    stepNumber: (isActive) => ({
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      background: isActive ? "#fff" : "#8B4513",
      color: isActive ? "#8B4513" : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontSize: "0.9rem",
      zIndex: 15,
      transition: "all 0.3s ease",
    }),
    mobileStyles: `
      @media (max-width: 768px) {
        .timeline-step {
          flex-direction: column !important;
          margin-bottom: 40px !important;
        }
        .step-card {
          width: 100% !important;
          margin: 20px 0 !important;
          display: flex !important;
          flex-direction: column !important;
        }
 
        .timeline-title {
          font-size: 2.5rem !important;
        }
        .connection-line {
          left: 30px !important;
          transform: none !important;
        }
        .step-icon {
          position: relative !important;
          left: auto !important;
          top: auto !important;
          height:50px !important;
          width:50px !important;
          transform: none !important;
          margin: 0 auto 20px !important;
        }
      }
    `,
  };

  return (
    <>
      <style>{styles.mobileStyles}</style>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.moments}>MOMENTS</div>
          <h1 style={styles.title} className="timeline-title">
            How it works
          </h1>
          <div style={styles.decorativeLine}>
            <div style={styles.decorativeFlower}>❀</div>
          </div>
        </div>

        <div style={styles.timelineContainer}>
          <div style={styles.connectionLine}></div>

          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <div
                key={step.id}
                style={styles.timelineStep(index)}
                className="timeline-step"
                onClick={() => setActiveStep(index)}
              >
                <div style={styles.stepIcon(isActive)}>
                  <Icon size={32} color={isActive ? "#fff" : "#8B4513"} />
                  <div style={styles.stepNumber(isActive)}>{step.id}</div>
                </div>

                <div
                  style={styles.stepCard(isActive, index)}
                  className="step-card"
                >
                  <div style={styles.stepContent}>
                    {/* <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    > */}
                    <Icon
                      size={32}
                      color="#be1313ff"
                      style={{ marginBottom: "10px" }}
                    />
                    <h3 style={styles.stepTitle}>{step.title}</h3>
                  </div>
                  {/* <div style={styles.stepTiming}>{step.timing}</div> */}
                  <p style={styles.stepDescription}>{step.description}</p>
                  {/* </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Timeline;
