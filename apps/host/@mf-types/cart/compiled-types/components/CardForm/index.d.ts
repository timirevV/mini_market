import { FC } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
interface CardFormProps {
    onSuccess?: () => void;
}
declare const CardForm: FC<CardFormProps>;
export default CardForm;
