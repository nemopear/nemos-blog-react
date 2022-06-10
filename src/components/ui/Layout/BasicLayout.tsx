import { Container } from "@mantine/core";
import { Footer } from "./footer";
import { Header } from "./header";

type BasicLayoutProps = {
  children?: React.ReactNode;
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
