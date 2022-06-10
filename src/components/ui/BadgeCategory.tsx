import { Badge, BadgeProps } from "@mantine/core";
type BadgeCategoryProps = {
  bgColor: string;
  label: string;
};
const BadgeCategory = ({ bgColor, label }: BadgeCategoryProps) => {
  console.log(bgColor, label);

  return (
    <Badge
      className="cursor-pointer text-white capitalize text-sm font-medium py-3"
      sx={{
        backgroundColor: `${bgColor}`,
        color: "#fff",
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
