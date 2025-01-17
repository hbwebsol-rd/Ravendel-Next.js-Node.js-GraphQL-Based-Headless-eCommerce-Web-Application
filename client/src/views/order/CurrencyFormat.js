import EuroIcon from "@mui/icons-material/Euro";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CurrencyPoundOutlinedIcon from "@mui/icons-material/CurrencyPoundOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { get } from "lodash";
export function currencyFormat(num) {
  if (num !== undefined)
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export const currencySetter = (currency, fontSize) => {
  if (currency === "usd")
    return <AttachMoneyOutlinedIcon sx={{ fontSize: fontSize }} />;
  if (currency === "eur") return <EuroIcon sx={{ fontSize: fontSize }} />;
  if (currency === "gbp")
    return <CurrencyPoundOutlinedIcon sx={{ fontSize: fontSize }} />;
  if (currency === "cad")
    return <AttachMoneyOutlinedIcon sx={{ fontSize: fontSize }} />;
  if (currency === "inr")
    return <CurrencyRupeeIcon sx={{ fontSize: fontSize }} />;
};
export const formattedPrice = (value, currencyOptions) => {
  const decimal = get(currencyOptions, "number_of_decimals", "2");
  const thousandSeparator = get(currencyOptions, "thousand_separator", ",");
  const decimalSeparator = get(currencyOptions, "decimal_separator", ".");
  return value
    .toFixed(decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

    .replace(".", decimalSeparator);
};
export const getPrice = (price, currencyOptions) => {
  let fixed = 3;
  if (typeof price === "string") {
    return formattedPrice(parseFloat(price), currencyOptions);
  } else if (typeof price === "number") {
    return formattedPrice(price, currencyOptions);
  }

  return "0.00";
};
export const formatNumber = (value) => (value && !isNaN(value) ? value : "0");
export const isPriceZero = (price) => {
  if (price === 0) return true;
  else return false;
};
export const isCouponAppliedAndNotFreeShipping = (couponCartDetail) => {
  return (
    get(couponCartDetail, "couponApplied") &&
    !get(couponCartDetail, "isCouponFreeShipping")
  );
};
