
//its updated 1
import client from "../apollo-client";
import Head from 'next/head';
import Image from 'next/image';
import Homebanner from "../components/banner/homebanner";
import Category from "../components/category/category";
import PruductCart from "../components/category/pruductcart";
import RavendelBanner from "../components/banner/banners";
import FeatureBrand from "../components/category/featurebrand";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import { GET_HOMEPAGE_DATA_QUERY, FEATURE_PRODUCT_QUERY, GET_RECENT_PRODUCTS_QUERY, GET_CATEGORIES_QUERY, ON_SALE_PRODUCTS_QUERY ,GET_REVIEWS} from '../queries/home';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from "react";
import { mutation } from "../utills/helpers";
import { UPDATE_CART_PRODUCT } from "../queries/cartquery";
import { useSelector, useDispatch } from "react-redux";
import { settingActionCreator, stripePaymentKeyAction } from "../redux/actions/settingAction"
import { userCarts } from "../redux/actions/userCartAction";
import { loadReviewAction } from "../redux/actions/productAction";

export default function Home({ homepageData, seoInfo, homePageInfo, currencyStore, stripe_Public_key, category, recentproducts, featureproducts, onSaleProducts,allReviews }) {
  // console.log("homepage data", stripe_Public_key);
  const [press, setPress] = useState(false);
  const initialRender = useRef(true)
  const dispatch = useDispatch()

  const session = useSession()
  // console.log('sessionnnnnn',session);
  const userCart = useSelector(state => state.userCart)
  const cart = useSelector(state => state.cart)
  // console.log("userCart: ", userCart)
  const productss = useSelector(state => state.products )  

  useEffect(() => {
    dispatch(stripePaymentKeyAction(stripe_Public_key))
    dispatch(settingActionCreator(currencyStore.currency_options))
    // const dataToCheck = [1,2,3,4,5,6,7,8];
  
    

  }, [])
  console.log('checkProducts',productss);
  useEffect(()=>{
    dispatch(loadReviewAction(allReviews.reviews.data)) ;
  },[allReviews])


  // console.log('onSaleProductssss',onSaleProducts);
  // console.log('All reviews',allReviews);
  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     let id = session.data.user.accessToken.customer._id
  //     let token = session.data.user.accessToken.token
  //     dispatch(userCarts(id, token))
  //   }
  // }, [])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      if (session.status === "authenticated") {
        userCartUpdate(userCart, cart);
      }
    }
    else {
      setPress(true);
    }
  }, [userCart, cart])

  async function userCartUpdate(userCart, cart) {
    let token = await session.data.user.accessToken.token
    var Cart = await cart.map(product => {
      return {
        product_id: product._id,
        qty: product.quantity,
        product_title: product.name,
        product_image: product.feature_image?.original,
        product_price: product.pricing?.sellprice || 0
      }
    })

    let variables = {
      id: userCart.card_id,
      products: Cart,
      total: 0,
    }
    // console.log("variables", variables)
    if (userCart.card_id === undefined) {
      return undefined;
    } else {
      await mutation(UPDATE_CART_PRODUCT, variables, token).then(res => res)
    }
  }

  return (
    <div>
      <Head>
        {seoInfo && seoInfo.meta_title ?
          <title>{seoInfo.meta_title}</title>
          : null}
        {seoInfo && seoInfo.meta_description ?
          <meta name="description" content={seoInfo.meta_description} />
          : null}
        {seoInfo && seoInfo.meta_tag ?
          <meta name="keywords" content={seoInfo.meta_tag} />
          : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>

      {homePageInfo && homePageInfo.slider && homePageInfo.slider?.length > 0 ?
        <Homebanner slider={homePageInfo.slider} Image={Image} />
        : null}

      {category?.length > 0 ? <Category category={category} /> : null}

      <RavendelBanner />

      {recentproducts?.length > 0 ?
        <>
          <PruductCart productDetail={recentproducts} featureproducts={featureproducts} />
        </>
        : null}
      {onSaleProducts?.length > 0 ?
        <>
          {/* <RavendelBanner /> */}
          <OnSaleProductCard onSaleProduct={onSaleProducts} />
        </>
        : null}

      {/* <FeatureBrand /> */}
    </div>
  )
};

export async function getStaticProps() {
  var homepageData = [];
  var featureproducts = [];
  var category = [];
  var recentproducts = [];
  var onSaleProducts = [];
  var currencyStore = [];
  var allReviews = {};
  let stripe_Public_key = '';
  /* ===============================================Get HomepageData Settings ===============================================*/

  try {
    const { data: homepagedata } = await client.query({
      query: GET_HOMEPAGE_DATA_QUERY
    })
    console.log("homepage dataaaa===", homepagedata);
    homepageData = homepagedata
    currencyStore = homepagedata?.getSettings?.store
    stripe_Public_key = homepagedata?.getSettings?.paymnet?.stripe
  }
  catch (e) {
    console.log("homepage Error===", e);
  }
  // console.log("homepage", homepageData);

  /* ===============================================Get Settings ===============================================*/
  if (homepageData?.getSettings?.appearance.home.add_section_in_home.feature_product) {
    try {
      const { data: featureproductsData } = await client.query({
        query: FEATURE_PRODUCT_QUERY
      });

      featureproducts = featureproductsData?.featureproducts;
    } catch (e) {
      console.log('homepage Setting Error===============', e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }
  }

  /* ===============================================Get Recent Prdouct ===============================================*/
  if (homepageData?.getSettings?.appearance.home.add_section_in_home.recently_added_products) {
    try {
      const { data: recentprductData } = await client.query({
        query: GET_RECENT_PRODUCTS_QUERY
      });
      recentproducts = recentprductData?.recentproducts
    }
    catch (e) {
      console.log('Recent Product Error===============', e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }
  }
  // console.log("recentproduct===", recentproducts);

  /* ===============================================Get Category Prdouct ===============================================*/

  try {
    const { data: categoryData } = await client.query({
      query: GET_CATEGORIES_QUERY
    });
    category = categoryData?.productCategories.data
  }
  catch (e) {
    console.log("Categories Error=======", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
  }


  /* ===============================================Get All product Reviews  ===============================================*/

  try {
    const { data: Reviews } = await client.query({
      query: GET_REVIEWS
    });
    allReviews = Reviews
  }
  catch (e) {
    console.log("Reviews Error=======", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
  }





  /* ===============================================Get OnSale Product  ===============================================*/

  console.log('onsale Slider check',homepageData?.getSettings?.appearance.home.slider[0].image)
  if (!homepageData?.getSettings?.appearance.home.add_section_in_home.products_on_sales) {           //dont know why in this if condition the product on sale is false so I have to change the if conditon to work if it is false which is not good I think
    try {
      const { data: onSaleProductsData } = await client.query({
        query: ON_SALE_PRODUCTS_QUERY
      });
     
      onSaleProducts = onSaleProductsData?.onSaleProducts
    }
    catch (e) {
      console.log("=======", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
    }
  }

  let seoInfo = {};
  let homePageInfo = {}
  let themeInfo = {};

  if (homepageData && homepageData.getSettings) {
    let settings = homepageData.getSettings;
    if (settings.appearance && settings.appearance.home) {
      homePageInfo = settings.appearance.home;
    }
    if (settings.appearance && settings.appearance.theme) {
      themeInfo = settings.appearance.theme;
    }
    if (settings.seo) {
      seoInfo = settings.seo;
    }
  }
  return {
    props: {
      homepageData,
      currencyStore,
      stripe_Public_key,
      seoInfo,
      homePageInfo,
      themeInfo,
      featureproducts,
      recentproducts,
      category,
      onSaleProducts,
      allReviews
    },
    revalidate: 10,
  };
}