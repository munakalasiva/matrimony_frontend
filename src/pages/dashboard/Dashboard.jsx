import React, { useState } from "react";
import ProfileTab from "./Profile";
import SavedProfilesTab from "./SavedProfiles";
import SentInterestsTab from "./SentInterests";
import ReceivedInterestsTab from "./ReceivedInterests";
import MembershipTab from "./Membership";
import "../../App.css"; // new css

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { key: "profile", label: "My Profile", component: <ProfileTab /> },
    { key: "saved", label: "Saved Profiles", component: <SavedProfilesTab /> },
    { key: "sent", label: "Sent Interests", component: <SentInterestsTab /> },
    {
      key: "received",
      label: "Received Interests",
      component: <ReceivedInterestsTab />,
    },
    { key: "membership", label: "Membership", component: <MembershipTab /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-menu">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              className={
                activeTab === tab.key ? "menu-item active" : "menu-item"
              }
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="dashboard-content">
        {tabs.find((t) => t.key === activeTab)?.component}
      </div>
    </div>
  );
};

export default Dashboard;
