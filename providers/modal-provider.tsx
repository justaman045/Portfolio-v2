"use client";

import { useEffect, useState } from "react";

import { CustomModal } from "@/components/modals/custom-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Radix modals must only mount on the client to avoid hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CustomModal />
    </>
  );
};
