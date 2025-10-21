import * as React from "react";
interface BasicModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}
declare const BasicModal: React.FC<BasicModalProps>;
export default BasicModal;
