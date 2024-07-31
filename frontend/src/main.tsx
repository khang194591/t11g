import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { queryClient } from "./api";
import "./index.css";
import { Toaster } from "react-hot-toast";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<NextUIProvider>
			<QueryClientProvider client={queryClient}>
				<Toaster position="top-right" reverseOrder={false} />
				<App />
			</QueryClientProvider>
		</NextUIProvider>
	</React.StrictMode>,
);
