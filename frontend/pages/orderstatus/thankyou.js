
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { useSelector } from "react-redux";
import OrdersDetails from "../../components/account/component/orders-details";
import { useState, useEffect } from "react";
import { query } from "../../utills/helpers";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { useSession } from "next-auth/react";
import { query2 } from "../../utills/cartHelperfun";
import client from "../../apollo-client";
const ThankYou = () => {
    const checkoutDetail = useSelector(state => state.checkout)
    const [showOrderDetail, setShowOrderDetail] = useState(false)
    const [rderD, setOrderData] = useState("")
    const session = useSession();

    // console.log("Checkout", session)
    useEffect(async () => {
        if (session.status === "authenticated") {
            const user_id = session.data.user.accessToken.customer._id
            console.log("user_id", user_id)
            const token = session.data.user.accessToken.token

            try {
                const { data: orderData } = await client.query({
                    query: GET_CUSTOMER_ORDERS_QUERY,
                    variables: { user_id },
                    context: {
                        headers: { token: token },
                    },

                })
                console.log("order", orderData)
            }
            catch (err) {
                console.error(err)
            }
            // query2(GET_CUSTOMER_ORDERS_QUERY, user_id, token).then(res => console.log("res", res))

        }
    }, [])
    return (
        <div>
            <PageTitle title="Thank You" />
            <BreadCrumb title={"Thank-You"} />

            <Container>
                <div className="thankyou-page-container"> <h1> Your order has been received.</h1>
                    {/* <button className="order-details-btn" onClick={() => setShowOrderDetail(!showOrderDetail)}>Order Invoices</button> */}
                    {/* {showOrderDetail && <OrdersDetails />} */}
                    <OrdersDetails />
                    <h3>Thank You for Shopping</h3>
                </div>
            </Container>
        </div>
    )
}
export default ThankYou;