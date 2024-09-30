import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MantineProvider } from "@mantine/core";

import { App } from "./App.tsx";
import { theme } from "./Configs/Theme/Theme.ts";
import "./global.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <RouterProvider router={router} />
        </MantineProvider>
    </StrictMode>
);
