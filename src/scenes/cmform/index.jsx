import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useState } from "react";
import { tokens } from "../../theme";

const experienceOptions = [
  { value: "Extremely happy", label: "😊 Extremely Happy", color: "#8BC34A" },
  { value: "Happy", label: "🙂 Happy", color: "#4CAF50" },
  { value: "Frustrated", label: "😠 Frustrated", color: "#FF9800" },
  { value: "Extremely frustrated", label: "😡 Extremely Frustrated", color: "#F44336" },
];

const impactOptions = [
  { value: "Revenue impact", label: "💰 Revenue Impact", color: "#00ACC1" },
  { value: "Business show stopper", label: "🚧 Business Show Stopper", color: "#00ACC1" },
  { value: "Customer experience", label: "👥 Customer Experience", color: "#00ACC1" },
];

const checkoutSchema = yup.object().shape({
  experience: yup.string().required("Experience selection is required"),
  experienceDetails: yup.string().max(500, "Maximum 500 characters").required("Details are required"),
  impact: yup.string().required("Impact selection is required"),
});

const initialValues = {
  experience: "",
  experienceDetails: "",
  impact: "",
  attachments: [],
};

const CmForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [status] = useState("Open");
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      date: new Date().toISOString(),
      status,
    };
    console.log(formData);
  };

  return (
    <Box m="20px">
      <Header title="Share your experience" />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">

              {/* Experience Selection Heading */}
              <Typography variant="h6" fontWeight="bold" fontSize={20}>
                How was your experience?
              </Typography>
              <Box 
  display="flex" 
  flexWrap="wrap" 
  gap="10px" 
  alignItems={isMobile ? "flex-start" : "flex-start"} 
  justifyContent={isMobile ? "center" : "flex-start"}
>
  {experienceOptions.map((option) => (
    <Button
      key={option.value}
      variant="contained" // Keeping it simple since we control styles manually
      color="primary"
      onClick={() => setFieldValue("experience", option.value)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Align emoji & text to the left
        gap: "8px", // Space between emoji & text
        textTransform: "none",
        fontSize: isMobile ? "1rem" : "1.2rem",
        width: isMobile ? "100%" : "auto",
        borderRadius: "8px",
        border: "none", // Removes border completely

        backgroundColor: values.experience === option.value
          ? option.color  // Use the color from experienceOptions
          : "transparent",                    
        color: values.experience === option.value
          ? theme.palette.mode === "dark" ? "#fff" : "#000"
          : colors.grey[1000],

        // Adjust shadow based on theme mode
        boxShadow: theme.palette.mode === "dark"
          ? "4px 4px 8px rgba(255, 255, 255, 0.15)"  // Light gray shadow in dark mode
          : "4px 4px 8px rgba(0, 0, 0, 0.15)",       // Dark shadow in light mode

        transition: "0.3s",
        "&:hover": {
          backgroundColor: values.experience === option.value
            ? theme.palette.mode === "dark" ? colors.greenAccent[700] : colors.greenAccent[300]
            : colors.grey[300],
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          
          // Keep hover shadow consistent with theme
          boxShadow: theme.palette.mode === "dark"
            ? "4px 4px 8px rgba(255, 255, 255, 0.2)"  // Slightly stronger light shadow in dark mode
            : "4px 4px 8px rgba(0, 0, 0, 0.2)",       // Slightly stronger dark shadow in light mode
        },
      }}
    >
      <span>{option.label}</span>
    </Button>
  ))}
</Box>
              {touched.experience && errors.experience && (
                <Typography color="error" fontSize="0.9rem">
                  {errors.experience}
                </Typography>
              )}

              {/* Experience Details */}

              <TextField
                fullWidth
                variant="outlined" // Changed from "filled" to "outlined"
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.subject && !!errors.subject}
                helperText={touched.subject && errors.subject}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px", // Soft rounded corners
                    border: `1px solid ${theme.palette.mode === "dark" ? "#555" : "#ccc"}`, // Thin border
                    backgroundColor: theme.palette.mode === "dark" ? "#1f2a40" : "#ffffff", // Background color
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    "&:hover": {
                      borderColor: theme.palette.mode === "dark" ? "#888" : "#999", // Hover effect
                      boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)", // Slightly stronger shadow on hover
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#bbb" : "#555",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Removes the default outline
                  },
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                label="Details of your experience"
                name="experienceDetails"
                value={values.experienceDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.experienceDetails && !!errors.experienceDetails}
                helperText={touched.experienceDetails && errors.experienceDetails}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.mode === "dark" ? "#555" : "#ccc"}`,
                    backgroundColor: theme.palette.mode === "dark" ? "#1f2a40" : "#ffffff",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      borderColor: theme.palette.mode === "dark" ? "#888" : "#ffffff",
                      boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? "#bbb" : "#555",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              />



              {/* Impact Selection */}
              <Typography variant="h6" fontWeight="bold" fontSize={20}>
                Impact
              </Typography>
              <Box display="flex" flexWrap="wrap" gap="10px">
                {impactOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={values.impact === option.value ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => setFieldValue("impact", option.value)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start", // Align emoji & text to the left
                      gap: "8px", // Space between emoji & text
                      textTransform: "none",
                      fontSize: isMobile ? "1rem" : "1.2rem",
                      width: isMobile ? "100%" : "auto",
                      borderRadius: "8px",
                      border: "none", // Removes border completely
              
                      backgroundColor: values.impact === option.value
                      ? option.color  // Use the color from experienceOptions
                      : "transparent",                     
                      color: values.experience === option.value
                        ? theme.palette.mode === "dark" ? "#fff" : "#000"
                        : colors.grey[1000],
              
                      // Adjust shadow based on theme mode
                      boxShadow: theme.palette.mode === "dark"
                        ? "4px 4px 8px rgba(255, 255, 255, 0.15)"  // Light gray shadow in dark mode
                        : "4px 4px 8px rgba(0, 0, 0, 0.15)",       // Dark shadow in light mode
              
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: values.experience === option.value
                          ? theme.palette.mode === "dark" ? colors.greenAccent[700] : colors.greenAccent[300]
                          : colors.grey[300],
                        color: theme.palette.mode === "dark" ? "#fff" : "#000",
                        
                        // Keep hover shadow consistent with theme
                        boxShadow: theme.palette.mode === "dark"
                          ? "4px 4px 8px rgba(255, 255, 255, 0.2)"  // Slightly stronger light shadow in dark mode
                          : "4px 4px 8px rgba(0, 0, 0, 0.2)",       // Slightly stronger dark shadow in light mode
                      },
                    }}
                  >
                    <span>{option.label}</span>
                  </Button>

                ))}
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" fontSize={20}>
                  📩 Upload Attachment
                </Typography>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*, .pdf, .doc, .docx"
                  style={{ display: "none" }}
                  id="file-input"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("attachments", file);
                  }}
                />

                {/* Styled Button as Letter-Style Input */}
                <label htmlFor="file-input">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      backgroundColor: colors.blueAccent[600],
                      color: "#FFF",
                      padding: "10px 20px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                      textTransform: "none",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: colors.blueAccent[500],
                        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    ✉️ Choose File
                  </Button>
                </label>

                {/* Display Selected File Name with Letter Icon */}
                {values.attachments && (
                  <Typography
                    fontSize="1rem"
                    color={theme.palette.mode === "dark" ? "#fff" : "#000"}
                    mt={1}
                    display="flex"
                    alignItems="center"
                    gap="8px"
                  >
                    📄 Selected File: <strong >{values.attachments.name}</strong>
                  </Typography>
                )}

                {/* Error Message */}
                {touched.attachments && errors.attachments && (
                  <Typography color="error" fontSize="0.9rem">
                    {errors.attachments}
                  </Typography>
                )}
              </Box>


              {/* Submit Button */}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "10px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                    transition: "0.3s",
                    backgroundColor: colors.blueAccent[700],
                    "&:hover": { backgroundColor: colors.blueAccent[600], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                  }}
                >
                  Submit Experience
                </Button>
              </Box>

            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CmForm;