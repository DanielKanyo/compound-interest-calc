import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MantineProvider } from "@mantine/core";

import { App } from "./App.tsx";
import { theme } from "./Configs/Theme/Theme.ts";
import "./global.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <App />
        </MantineProvider>
    </StrictMode>
);
