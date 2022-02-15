import React from "react";
import Head from "next/head";

type Props = {
  title: string;
};

const Seo: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title} | find your worths</title>
    </Head>
  );
};

export default Seo;
