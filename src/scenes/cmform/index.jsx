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
  { value: "Revenue impact", label: "💰 Revenue Impact", color: "#1E88E5" },
  { value: "Business show stopper", label: "🚧 Business Show Stopper", color: "#9C27B0" },
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
              <Typography variant="h6" fontWeight="bold" fontSize={20}>
                How was your experience?
              </Typography>
              <Box display="flex" flexWrap="wrap" gap="10px">
                {experienceOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={values.experience === option.value ? "contained" : "outlined"}
                    onClick={() => setFieldValue("experience", option.value)}
                    sx={{
                      textTransform: "none",
                      fontSize: isMobile ? "1rem" : "1.2rem",
                      width: isMobile ? "100%" : "auto",
                      backgroundColor: values.experience === option.value ? option.color : "transparent",
                      color: values.experience === option.value ? "white" : colors.grey[1000],
                      boxShadow: "3px 3px 6px rgba(187, 185, 185, 0.2)",
                      transition: "0.3s",
                      "&:hover": { backgroundColor: option.color, color: "white" },
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </Box>
              {touched.experience && errors.experience && (
                <Typography color="error" fontSize="0.9rem">
                  {errors.experience}
                </Typography>
              )}

              <Typography variant="h6" fontWeight="bold" fontSize={20}>
                Impact
              </Typography>
              <Box display="flex" flexWrap="wrap" gap="10px">
                {impactOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={values.impact === option.value ? "contained" : "outlined"}
                    onClick={() => setFieldValue("impact", option.value)}
                    sx={{
                      fontSize: isMobile ? "1rem" : "1.2rem",
                      width: isMobile ? "100%" : "auto",
                      backgroundColor: values.impact === option.value ? option.color : "transparent",
                      color: values.impact === option.value ? "white" : colors.grey[1000],
                      boxShadow: "3px 3px 6px rgba(187, 185, 185, 0.2)",
                      transition: "0.3s",
                      textTransform: "none",
                      "&:hover": { backgroundColor: option.color, color: "white" },
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </Box>
              {touched.impact && errors.impact && (
                <Typography color="error" fontSize="0.9rem">
                  {errors.impact}
                </Typography>
              )}
              <TextField
  fullWidth
  variant="filled"
  multiline
  rows={1}
  label="Subject"
  sx={{
    "& .MuiFilledInput-root": {
      border: `2px solid ${theme.palette.mode === "dark" ? "#FFF" : "#000"}`,
      borderRadius: "5px",
      backgroundColor: "transparent", // Maintain theme adaptability
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.2rem",
      color: theme.palette.mode === "dark" ? "#FFF" : "#000",
    },
  }}
  name="experienceDetails"
  value={values.experienceDetails}
  onChange={handleChange}
  onBlur={handleBlur}
  error={!!touched.experienceDetails && !!errors.experienceDetails}
  helperText={touched.experienceDetails && errors.experienceDetails}
/>

<TextField
  fullWidth
  variant="filled"
  multiline
  rows={4}
  label="Details of your experience"
  sx={{
    "& .MuiFilledInput-root": {
      border: `2px solid ${theme.palette.mode === "dark" ? "#FFF" : "#000"}`,
      borderRadius: "5px",
      backgroundColor: "transparent",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.2rem",
      color: theme.palette.mode === "dark" ? "#FFF" : "#000",
    },
  }}
  name="experienceDetails"
  value={values.experienceDetails}
  onChange={handleChange}
  onBlur={handleBlur}
  error={!!touched.experienceDetails && !!errors.experienceDetails}
  helperText={touched.experienceDetails && errors.experienceDetails}
/>

              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "10px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                    transition: "0.3s",
                    backgroundColor: colors.blueAccent[700],
                    "&:hover": { boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                  }}
                >
                  Submit experience
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
