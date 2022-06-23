import "../styles/globals.css";
import { Provider as GraphQLProdiver, createClient } from "urql";
import Header from "../components/Header/index";
import { RecoilRoot } from "recoil";
import "tw-elements";

const Client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GraphQLProdiver value={Client}>
        <Header />
        <Component {...pageProps} />
      </GraphQLProdiver>
    </RecoilRoot>
  );
}

export default MyApp;
