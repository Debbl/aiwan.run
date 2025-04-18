import { domAnimation, LazyMotion } from "@workspace/motion";
import { ThemeProvider } from "next-themes";
import ClientProviders from "./index.client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LazyMotion features={domAnimation} strict>
        <ClientProviders>{children}</ClientProviders>
      </LazyMotion>
    </ThemeProvider>
  );
}
