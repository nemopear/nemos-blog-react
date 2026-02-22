import { Chip } from "@mui/material";

type BadgeCategoryProps = {
  bgColor?: string;
  label?: string;
  className?: string;
};

const BadgeCategory = ({ bgColor, label, className }: BadgeCategoryProps) => {
  return (
    <Chip
      label={label}
      size="small"
      className={className}
      sx={{
        bgcolor: bgColor || "#e0e0e0",
        color: "#fff",
        fontWeight: 500,
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8,
        },
      }}
    />
  );
};

export default BadgeCategory;
