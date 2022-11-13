import "../styles/globals.css";
import { Provider as GraphQLProdiver, createClient } from "urql";
import Header from "../components/Header/index";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@auth0/nextjs-auth0";
import Footer from "../components/Footer";
import { useEffect } from "react";
const { AnimatePresence } = require("framer-motion");

const Client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  return (
    <UserProvider>
      <RecoilRoot>
        <GraphQLProdiver value={Client}>
          <AnimatePresence>
            <Header />
            <Component {...pageProps} />
            <Toaster />
          </AnimatePresence>
        </GraphQLProdiver>
      </RecoilRoot>
    </UserProvider>
  );
}

export default MyApp;
