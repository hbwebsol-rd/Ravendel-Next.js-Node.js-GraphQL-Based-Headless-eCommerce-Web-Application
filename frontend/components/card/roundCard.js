import React from "react";
import ProductImage from "../imageComponent";
import PropTypes from 'prop-types';
const RoundCard = ({ name,image }) => {
  return (
    <div className="brand-card-container">
      <div className="category-card-image brand-card-image">
          <ProductImage src={image} />
      </div>
      <div>
        <p className="brand-card-title">{name}</p>
      </div>
    </div>
  );
};
RoundCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  };
export default RoundCard;