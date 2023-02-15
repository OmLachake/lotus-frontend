# Lotus Wear

[Demo - Live Website](https://lotus-wear.vercel.app)

A ecommerce site built using the JAMStack approach. 

### Site doesnt work as Heroku offed their free plan, here is the demo video.

### Built Using :
- Next Js
- Tailwind CSS
- Stripe
- Strapi (CMS), Auth0
- GraphQL (Data Fetching)
- Cloudinary (Cached Media Delivery such as Product Images)


### I learnt : 
- Auth0
- Integrating Stripe through edge functions
- Deployments on Heroku
- Media Caching services 
- Managing and deploying graphQL APIs
- How a complete ecosystem of E Commerce (still left out the supply chain part) works


***


### Errors : 

- tw-elements must be imported asynchronously, as Next Js Build will fail due to the scripts running on server instead of the browser and throws a `ReferenceError`
- Stripe must be imported as Node Js imports and not using `import`, no stripe sdk supports browser runtimes.
- All Stripe Objects must be used if imported, else, throws a `child-process` error.

