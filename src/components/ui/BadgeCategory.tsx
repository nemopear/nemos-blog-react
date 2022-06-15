import { Badge } from "@mantine/core";
type BadgeCategoryProps = {
  bgColor: string;
  label: string;
};
const BadgeCategory = ({ bgColor, label }: BadgeCategoryProps) => {
  return (
    <Badge
      className="cursor-pointer py-3 text-sm font-medium capitalize text-white"
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
