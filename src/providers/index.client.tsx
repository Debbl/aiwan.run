"use client";
import { AppProgressBar } from "next-nprogress-bar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppProgressBar
        color="#fef3c7"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
}
