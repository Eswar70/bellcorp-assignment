import React from "react";
import "./Skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line small"></div>
    </div>
  );
};

export default SkeletonCard;
