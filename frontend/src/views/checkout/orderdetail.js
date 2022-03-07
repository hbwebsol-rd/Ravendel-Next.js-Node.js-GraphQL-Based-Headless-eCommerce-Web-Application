import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { productsAction } from "../../store/action/productAction";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";

const OrderDetails = ({getOrderDetails}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const [subtotal, setSubTotal] = useState(0);
  const [delievery, setDelievery] = useState(0);
  const [coupon, setcoupon] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [cartProduct, setCartProduct] = useState([]);

  const cartSubTotal = () => {
    var subtotalVar = 0;
    if (cartProduct && cartProduct.length > 0) {
      cartProduct.map((item) => {
        if (item.pricing.sellprice) {
          var sellPrice = item.pricing.sellprice * item.cartQty;
          subtotalVar = subtotalVar + sellPrice;
        } else {
          var totalPrice = item.pricing.price * item.cartQty;
          subtotalVar = subtotalVar + totalPrice;
        }
      });
    }
    setSubTotal(subtotalVar);
  };

  useEffect(() => {
    if (cartProduct.length > 0) {
      cartSubTotal();
    }
  }, [cartProduct]);

  const ListingCartProducts = () => {
    var filteredProducts = [];

    cart.products.map((item) => {
      products.products.filter((product) => {
        if (product.id === item.id) {
          product.cartQty = item.cartQty;
          filteredProducts.push(product);
        }
      });
    });

    setCartProduct(filteredProducts);
  };

  useEffect(() => {
    if (cart.products && cart.products.length > 0) {
      if (isEmpty(products.products)) {
        dispatch(productsAction());
      }
      if (products.products && products.products.length > 0) {
        ListingCartProducts();
      }
    }
  }, [cart.products]);

  useEffect(() => {
    if (products.products && products.products.length > 0) {
      ListingCartProducts();
    }
  }, [products.products]);

  useEffect(() => {
    var allData = {
      subtotal: subtotal,
      total: subtotal + delievery + coupon,
      paymentMethod: paymentMethod,
      coupon: coupon,
      delievery: delievery,
      products: cart.products,
      checkoutDate: new Date(),
    };
    getOrderDetails(allData);
  }, [subtotal, paymentMethod, coupon, delievery, cart.products]);

  return (
    <Fragment>
      {products.loading && <Loading />}
      <Typography variant="h3" className="margin-bottom-2">
        Your Orders
      </Typography>

      <Grid container spacing={4}>
        <Grid item md={12} sm={6} xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">Amount</TableCell>
                </TableRow>
              </TableHead>
              {cartProduct.length > 0 ? (
                <TableBody>
                  {cartProduct.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>x{product.cartQty}</TableCell>
                      <TableCell className="text-right">
                        $
                        {product.pricing.sellprice
                          ? product.pricing.sellprice.toFixed(2) *
                            product.cartQty
                          : product.pricing.price.toFixed(2) * product.cartQty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : null}
            </Table>

            <Table className="margin-top-3">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Subtotal</Typography>
                  </TableCell>
                  <TableCell className="text-right">${subtotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Shipping</Typography>
                  </TableCell>
                  <TableCell className="text-right">
                    {delievery === 0 ? "Free" : "Flat Rate: $" + delievery}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Discount</Typography>
                  </TableCell>
                  <TableCell className="text-right">
                    {coupon === 0 ? "$0" : "Coupon: $" + coupon}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Total</Typography>
                  </TableCell>
                  <TableCell className="text-right">
                    ${subtotal + delievery + coupon}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item md={12} sm={6} xs={12}>
          <Box component="div" m={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography variant="h5">Payment Method</Typography>
              </FormLabel>
              <RadioGroup
                aria-label="payment-method"
                name="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio color="default" />}
                  label="Cash on delievery"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio color="default" />}
                  label="Paypal"
                />
                <FormControlLabel
                  value="credit-card"
                  control={<Radio color="default" />}
                  label="Credit Card"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <Grid item className="text-center" md={12} sm={12} xs={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Proceed
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default OrderDetails;
