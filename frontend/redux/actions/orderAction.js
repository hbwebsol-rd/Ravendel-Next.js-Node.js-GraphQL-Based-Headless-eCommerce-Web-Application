/* eslint-disable no-unused-vars */
import { get } from "lodash";
import {
  GET_SINGLE_ORDER_DETAILS,
  UPDATE_PAYMENT_STATUS,
} from "../../queries/orderquery";
import { mutation, query } from "../../utills/helpers";
import {  calculateUserCart } from "./cartAction";

export const getSingleOrderAction = (variable) => (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });

  query(GET_SINGLE_ORDER_DETAILS, variable)
    .then((response) => {
      const success = get(response, "data.order.message.success");
      if (success) {
        const orderDetail = get(response, "data.order.data");
        return dispatch({
          type: ORDER_SUCCESS,
          payload: orderDetail,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_FAIL,
      });
    });
};
export const updatePaymentStatus = (variable,customerId) => (dispatch) => {
  dispatch({
    type: ORDER_LOADING,
  });
  mutation(UPDATE_PAYMENT_STATUS, variable)
    .then((response) => {
      const success = get(response, "data.updatePaymentStatus.success", false);
      if (success) {
        if(customerId){
        dispatch(calculateUserCart(customerId));
      }
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_FAIL,
      });
    });
};

export const ORDER_LOADING = "ORDER_LOADING";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDER_FAIL = "ORDER_FAIL";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const LOADING_FALSE = "LOADING_FALSE";