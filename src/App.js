import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import Dashboard from "./scenes/dashboard";
import Cm from "./scenes/cm";
import Crm from "./scenes/crm";
import CmForm from "./scenes/cmform";
import CrForm from "./scenes/crmform";
import Profile from "./scenes/profile"

// Experience Pages
import AllExperiences from "./scenes/experiences/allExperiences";
import NewExperiences from "./scenes/experiences/newExperiences";
import PendingExperiences from "./scenes/experiences/pendingExperiences";
import ResolvedExperiences from "./scenes/experiences/resolvedExperiences";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isMobile = useMediaQuery("(max-width: 900px)"); // Detect mobile screen

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" height="100vh">
          {/* Sidebar: Hide in Mobile */}
          {!isMobile && isSidebar && <Sidebar isSidebar={isSidebar} />}

          {/* Main Content: Adjust for Mobile */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginLeft: isMobile ? "0px" : (isSidebar ? "250px" : "0px"), 
              padding: "20px",
              overflowY: "auto",
              transition: "margin 0.3s ease-in-out",
            }}
          >
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cm" element={<Cm />} />
              <Route path="/crm" element={<Crm />} />
              <Route path="/cmform" element={<CmForm />} />
              <Route path="/crmform" element={<CrForm />} />
              <Route path="/profile" element={<Profile />} />
              {/* Experience Routes */}
              <Route path="/allExperiences" element={<AllExperiences />} />
              <Route path="/newExperiences" element={<NewExperiences />} />
              <Route path="/pendingExperiences" element={<PendingExperiences />} />
              <Route path="/resolvedExperiences" element={<ResolvedExperiences />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;