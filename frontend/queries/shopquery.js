import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
  query {
  products {
    data {
      _id
      name
      categoryId {
        id
        name
        __typename
      }
      url
      sku
      description
      quantity
      pricing
      feature_image
      gallery_image
      meta
      shipping
      tax_class
      status
      featured_product
      product_type
      custom_field
      date
      updated
      short_description
      __typename
    }
    message {
      success
      message
      __typename
    }
    __typename
  }
}

`;
export const GET_BRANDS_QUERY = gql`
 query {
    brands {
      data {
        id
        name
        url
        brand_logo
        meta {
          title
          description
          keywords
        }
        date
        updated
      }
      message {
        message
        success
      }
    } 
  }
`;
export const GET_SINGLE_PRODUCT = gql`
query ($url: String!) {
  productsbycaturl(cat_url: $url) {
    data {
      id
      name
      parentId
      url
      description
      image
      meta
      child_cat {
        id
        name
        url
        __typename
      }
      filter_brands {
        brandMaster {
          _id
          name
          __typename
        }
        __typename
      }
      filter_attributes {
        _id {
          attribute_id
          attribute_value_id
          __typename
        }
        attributeMaster {
          _id
          name
          values
          __typename
        }
        __typename
      }
      __typename
    }
    message {
      message
      success
      __typename
    }
    __typename
  }
}

`;
export const GET_CATEGORY = gql`
  query($id: ID!) {
    productCategory(id: $id) {
      id
      name
      parentId
      url
      description
      image
      meta
      date
      updated
    }
  }
`;
export const GET_FILTEREDPRODUCTS = gql`
  query ($config: customObject) {
  filteredProducts(config: $config) {
    ...ProductTile
    __typename
  }
}

fragment ProductTile on Product {
  _id
  name
  url
  pricing
  quantity
  feature_image
  status
  brand {
    id
    name
    __typename
  }
  categoryId {
    id
    name
    __typename
  }
  attribute
  __typename
}
`;