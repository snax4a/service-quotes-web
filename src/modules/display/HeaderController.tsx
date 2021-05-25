import React from "react";
import Header from "next/head";
import { NextPage } from "next";
export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  owner?: string;
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Service Quotes app makes service management easy",
  additionalKeywords = [],
}) => {
  return (
    <Header>
      {title ? (
        <title>{title} | Service Quotes</title>
      ) : (
        <title>Service Quotes</title>
      )}
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`Service Quotes, management${additionalKeywords?.map(
          (k) => `, ${k}`
        )}`}
      />
    </Header>
  );
};
