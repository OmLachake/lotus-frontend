export const PRODUCT_QUERY = `
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
