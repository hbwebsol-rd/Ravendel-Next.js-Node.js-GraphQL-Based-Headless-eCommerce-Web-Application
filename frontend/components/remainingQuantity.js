import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { get } from "lodash";

const RemainingQuantity = ({ quantity }) => {
  const setting = useSelector((state) => state.setting);
  const [showQuantity, setShowQuantity] = useState(true); // Default to true

  useEffect(() => {
    let stockOption = get(setting, "setting.store.inventory");

    // Check if manage_stock is true
    if (!stockOption?.manage_stock) {
      setShowQuantity(false);
      return; // Skip further execution if manage_stock is false
    }

    switch (get(stockOption, "stock_display_format")) {
      case "leftStock":
        setShowQuantity(quantity <= get(stockOption, "left_quantity"));
        break;
      case "never":
        setShowQuantity(false);
        break;
      case "inStock":
        setShowQuantity(true);
        break;
      default:
        setShowQuantity(false);
        break;
    }
  }, [setting, quantity]);

  if (!showQuantity) return null;

  return (
    <>
      {quantity > 0 && (
        <div className="itemComponents-base-lowUnitCount">{`${quantity} Left`}</div>
      )}
      {showQuantity && quantity <= 0 && (
        <div className="itemComponents-base-lowUnitCount">Out of Stock</div>
      )}
    </>
  );
};

RemainingQuantity.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default RemainingQuantity;
