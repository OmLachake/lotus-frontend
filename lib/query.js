export const PRODUCTS_QUERY = `
query {
    products {
      data {
        attributes {
          title
          price
          slug
          images {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `
  query getProduct($slug: String!){
    products(
      filters:{
        slug:{ eq:$slug }
      }
    ){
      data {
        attributes {
          title
          price
          slug
          description
          images {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`;
