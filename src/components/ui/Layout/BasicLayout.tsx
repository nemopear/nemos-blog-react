import { Container } from "@mui/material";
import { Footer } from "./footer";
import { Header } from "./header";

type BasicLayoutProps = {
  children?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};

export const BasicLayout: React.FC<BasicLayoutProps> = ({ 
  children, 
  maxWidth = "lg" 
}) => {
  return (
    <>
      <Header />
      <Container maxWidth={maxWidth} sx={{ width: "100%", px: { xs: 2, sm: 3 } }}>
        <div className="">
          <div className="flex min-h-screen flex-col">
            <div className="mb-auto">{children}</div>
            <Footer />
          </div>
        </div>
      </Container>
    </>
  );
};
