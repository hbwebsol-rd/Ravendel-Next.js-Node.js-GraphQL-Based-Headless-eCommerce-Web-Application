
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import Container from 'react-bootstrap/Container';
import LogIn from "../../components/account/login";
import Register from "../../components/account/register";
import { useSelector, useDispatch } from "react-redux";
import { customerAction } from "../../redux/actions/loginAction";
import Link from "next/link";
import { useSession, getSession, signIn, signOut, getCsrfToken } from 'next-auth/react';

const Account = () => {


    const session = useSession()
    // console.log("session", session)
    let customer = session.status === "authenticated"

    const dispatch = useDispatch();
    // const customer = useSelector(state => state.customer)
    // console.log("customer", customer);
    return (
        <>
            <BreadCrumb title={"register"} />
            <Container>
                {/* {customet ? (
                    <div>
                        <h4> your are already login</h4>
                        <button>logout</button>
                        <Link href="/">
                            <a style={{ color: "white" }} onClick={() => {
                                dispatch(customerAction(false))
                                localStorage.removeItem("customer")
                            }}>Log Out</a>
                        </Link>
                    </div>

                ) : ( */}
                <div className="row account-row justify-content-between">
                    <div className="col-lg-5 account-page" >
                        <LogIn />
                    </div>
                    <div className="col-lg-6 ">
                        <Register />
                    </div>
                </div>
                {/* )} */}

            </Container>
        </>

    )
}
export default Account;

// export async function getServerSideProps(context) {

//     const session = await getSession(context)
//     // console.log("context", session)
//     return {
//         props: {
//             // csrfToken: await getCsrfToken(context),
//         },
//     };
// }
