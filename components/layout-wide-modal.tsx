"use client";

import { modalState } from "@/atoms/appAtoms";
import React from "react";
import { useRecoilValue } from "recoil";
import Modal from "./modal";

const LayoutWideModal = () => {
  const showModal = useRecoilValue(modalState);
  return <>{showModal && <Modal />}</>;
};

export default LayoutWideModal;
