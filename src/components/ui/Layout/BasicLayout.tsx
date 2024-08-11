import { Container } from "@mantine/core";
import { Footer } from "./footer";
import { Header } from "./header";

type BasicLayoutProps = {
  children?: React.ReactNode;
};

export const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <Container size="lg" className="w-full">
      <div className="">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="mb-auto">{children}</div>
          <Footer />
        </div>
      </div>
    </Container>
  );
};
