"use client";

import { modalAtom } from "@/atoms/appAtoms";
import Modal from "./modal";
import { useAtomValue } from "jotai";

const LayoutWideModal = () => {
  const showModal = useAtomValue(modalAtom);
  return <>{showModal && <Modal />}</>;
};

export default LayoutWideModal;
