import { Logo } from "@components/logo";
import { Container, Divider } from "@mantine/core";
import React from "react";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

export const Footer: React.FC = () => {
  return (
    <>
      <Divider />
      <div className="py-5">
        <Container size="lg">
          <div className="flex justify-between items-center">
            <Logo />
            <ul className="flex justify-center list-none p-0 m-0 space-x-2">
              <li className="text-2xl">
                <a href="https://github.com/nemopear" target="_blank">
                  <IoLogoGithub />
                </a>
              </li>
              <li className="text-2xl">
                <a href="https://twitter.com/nemopear" target="_blank">
                  <IoLogoTwitter />
                </a>
              </li>
              <li className="text-2xl">
                <a
                  href="https://www.linkedin.com/in/nutchaya-vorayingyong-69682543/"
                  target="_blank"
                >
                  <IoLogoLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
};
