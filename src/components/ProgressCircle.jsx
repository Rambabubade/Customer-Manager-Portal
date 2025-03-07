import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0.75", size = "50", borderWidth = 10 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  
  // Calculate inner circle size based on borderWidth
  const innerCircleSize = 50 - borderWidth; // Adjusts the filled center

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} ${innerCircleSize}%, transparent ${innerCircleSize + 1}%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.primary[1000]} ${angle}deg 360deg),
            ${colors.blueAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
