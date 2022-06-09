import { Container } from "@mantine/core";
import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./Header";

type BasicLayoutProps = {
  children: ReactNode;
};

export const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Container size="lg" className="mb-auto">
        {children}
      </Container>
      <Footer />
    </div>
  );
};
