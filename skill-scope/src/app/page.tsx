"use client";

import { useState } from "react";
import { Container, Title, Text, Box } from "@mantine/core";
import { metadata } from "./metadata";
import SearchForm from "./components/SearchForm";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container size="sm" style={{ height: "100vh" }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Title
          order={1}
          style={{
            textAlign: "center",
            color: "neutral-200",
            marginBottom: "1rem",
          }}
        >
          {metadata.title}
        </Title>
        <Text
          size="xl"
          style={{
            textAlign: "center",
            color: "neutral-200",
            marginBottom: "2rem",
          }}
        >
          {metadata.description}
        </Text>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
    </Container>
  );
};

export default Home;
