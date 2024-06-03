import React from "react";

const Banner = ({ dark }) => {
  return (
    <section id="offers" class="py-5">
      <div className="containers">
        <div className={`content-text ${dark ? "lightmood" : "darkmood"}`}>
          <span>Discount up to 40%</span>
          <h3>Grand Sale Offer</h3>
          <button className="btn">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
