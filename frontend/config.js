// export const BASE_URL = "/";
// export const baseUrl = `/graphql`;
// export const IMAGE_BASE_URL = `/`;
// export const API_BASE_URL = `/apis`;

export const BASE_URL = "zemjet.com";
export const baseUrl = `https://${BASE_URL}/graphql`;
export const IMAGE_BASE_URL = `https://${BASE_URL}/`;
export const API_BASE_URL = `https://${BASE_URL}/apis`;


/* -------------------------------  imageURl changes to bucketURL ------------------------- */

// export var bucketName = "revendal-image-prod";
export var bucketName = "revendal-image";
export var BUCKET_BASE_URL = `https://${bucketName}.s3.amazonaws.com/`;
export const APP_NAME = "Ravendel";
export const APP_URL = "www.ravendel.com";
export const APP_EMAIL_ID = "sales@ravendel.com";

// if (process.env.NODE_ENV === "production") {
//     bucketName = "revendal-image-prod";
//     bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
// }

// add production image url to bucket

//   bucketName = "revendal-image-prod";
