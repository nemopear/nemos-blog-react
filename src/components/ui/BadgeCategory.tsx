import { Badge } from "@mantine/core";
type BadgeCategoryProps = {
  bgColor: string;
  label: string;
  className?: string;
};
const BadgeCategory = ({ bgColor, label, className }: BadgeCategoryProps) => {
  return (
    // <Badge
    //   className={`btn-transition cursor-pointer py-3 text-sm font-medium capitalize ${
    //     className !== undefined ? className : ""
    //   }`}
    //   color="orange"
    //   variant="dot"
    // >
    //   {label}
    // </Badge>
    <Badge
      className={`btn-transition cursor-pointer py-3 text-sm font-medium capitalize  ${
        className !== undefined ? className : ""
      }`}
      color={bgColor}
      variant="dot"
      style={{
        // backgroundColor: `${bgColor}`,
        // color: "#fff",
        "&:hover": {
          opacity: ".8",
        },
      }}
    >
      {label}
    </Badge>
  );
};

export default BadgeCategory;
