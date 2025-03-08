import { Box, Button, TextField, Typography, useMediaQuery,useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useState } from "react";
import { tokens } from "../../theme";
// Define schema and initial values before the component
const experienceOptions = [
  { value: "Extremely happy", label: "😊 Extremely Happy" },
  { value: "Happy", label: "🙂 Happy" },
  { value: "Frustrated", label: "😠 Frustrated" },
  { value: "Extremely frustrated", label: "😡 Extremely Frustrated" },
];

const impactOptions = [
  { value: "Revenue impact", label: "💰 Revenue Impact" },
  { value: "Business show stopper", label: "🚧 Business Show Stopper" },
  { value: "Customer experience", label: "👥 Customer Experience" },
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
              <Box display="flex" flexWrap="wrap" gap="10px">
                {experienceOptions.map((option) => (
                  <Button
  key={option.value}
  variant={values.experience === option.value ? "contained" : "outlined"}
  color="primary"
  onClick={() => setFieldValue("experience", option.value)}
  sx={{
    textTransform: "none", // Ensures text remains in its original case
    fontSize: isMobile ? "1rem" : "1.2rem",
    width: isMobile ? "100%" : "auto",
    border: "none",
    boxShadow: "3px 3px 6px rgba(187, 185, 185, 0.2)",
    transition: "0.3s",
    "&:hover": { boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
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
              <TextField
                fullWidth
                variant="filled"
                multiline
                rows={1}
                label="Subject"
                InputLabelProps={{ style: { fontSize: "1.2rem" } }}
                name="experienceDetails"
                value={values.experienceDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.experienceDetails && !!errors.experienceDetails}
                helperText={touched.experienceDetails && errors.experienceDetails}
              />
              {/* Experience Details */}
              <TextField
                fullWidth
                variant="filled"
                multiline
                rows={4}
                label="Details of your experience"
                InputLabelProps={{ style: { fontSize: "1.2rem" } }}
                name="experienceDetails"
                value={values.experienceDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.experienceDetails && !!errors.experienceDetails}
                helperText={touched.experienceDetails && errors.experienceDetails}
              />


              {/* Impact Selection Heading */}
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
                fontSize: isMobile ? "1rem" : "1.2rem",
                width: isMobile ? "100%" : "auto",
                border: "none",
                boxShadow: "3px 3px 6px rgba(187, 185, 185, 0.2)",
                transition: "0.3s",
                textTransform: "none", // 👈 Prevents uppercase text
                "&:hover": { boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
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

              {/* Attachments */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "5px",
                  width: isMobile ? "100%" : "50%",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  name="attachments"
                  multiple
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={(event) => setFieldValue("attachments", event.currentTarget.files)}
                />
                <label
                  htmlFor="fileUpload"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.blueAccent[700],
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: isMobile ? "100%" : "auto",
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#5a0ca1" },
                  }}
                >
                  📤 Choose a file...
                </label>
                <Typography
                  sx={{
                    marginLeft: "10px",
                    fontSize: "1rem",
                    color: "#555",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {values.attachments.length > 0 ? values.attachments[0].name : "No file chosen"}
                </Typography>
              </Box>

              {/* Submit Button */}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  // color="secondary"
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
