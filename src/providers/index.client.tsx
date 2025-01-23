"use client";
import { AppProgressBar } from "next-nprogress-bar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppProgressBar options={{ showSpinner: false }} shallowRouting />
      {children}
    </>
  );
}
