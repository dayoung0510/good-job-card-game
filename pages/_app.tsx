import Layout from "./components/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GameContext from "./contexts/GameContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GameContext>
  );
}

export default MyApp;
