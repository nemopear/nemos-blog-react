import { Footer } from "./footer";
import { Header } from "./header";

type BasicLayoutProps = {
  children?: React.ReactNode;
};

export const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-screen-lg  px-4 sm:px-0 ">
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="mb-auto">{children}</div>
        <Footer />
      </div>
    </div>
  );
};
