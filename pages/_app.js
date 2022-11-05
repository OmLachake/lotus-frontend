import "../styles/globals.css";
import { Provider as GraphQLProdiver, createClient } from "urql";
import Header from "../components/Header/index";
import { RecoilRoot } from "recoil";
import "tw-elements";
import { Toaster } from "react-hot-toast";
const { AnimatePresence } = require("framer-motion");

const Client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GraphQLProdiver value={Client}>
        <AnimatePresence>
          <Header />
          <Component {...pageProps} />
          <Toaster />
        </AnimatePresence>
      </GraphQLProdiver>
    </RecoilRoot>
  );
}

export default MyApp;
