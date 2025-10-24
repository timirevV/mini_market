import { FC, useState } from "react";
import { useForm, UseFormProps } from "react-hook-form";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { SubmitButton } from "./style";
import ControlledInput from "../UI/ControlledInput";
import { CardData } from "../../interfaces";
import { FIELDS } from "../../shared/constants/cardInputsValues";

interface CardFormProps {
  onSuccess?: () => void;
  cartSum: number;
}

const INITIAL_CARD = {
  number: "",
  name: "",
  expiry: "",
  cvc: "",
};

const INITIAL_FORM: UseFormProps<CardData> = {
  mode: "onChange",
  defaultValues: INITIAL_CARD,
};

const CardForm: FC<CardFormProps> = ({ onSuccess, cartSum }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CardData>(INITIAL_FORM);

  const [card, setCard] = useState<CardData>(INITIAL_CARD);
  const [focus, setCardFocus] = useState<keyof CardData | "">("");

  const onSubmit = () => {
    reset();
    setCard(INITIAL_CARD);
    onSuccess?.();
  };

  const topFields = FIELDS.slice(0, 2);
  const rowFields = FIELDS.slice(2);

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <Cards {...card} focused={focus} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          gap: "10px",
          marginTop: 20,
          flexDirection: "column",
        }}
      >
        {topFields.map((f) => (
          <ControlledInput<CardData>
            key={f.name}
            name={f.name}
            control={control}
            label={f.label}
            type={f.type}
            rules={f.rules}
            formatValue={f.formatValue}
            inputProps={{
              "data-testid": f.name,
              ...f.inputProps,
            }}
            onValueChange={(v) =>
              setCard(
                (prev) => ({ ...(prev as CardData), [f.name]: v } as CardData)
              )
            }
            onFocus={() => setCardFocus(f.name as keyof CardData)}
          />
        ))}

        <div style={{ display: "flex", gap: "10px" }}>
          {rowFields.map((f) => (
            <ControlledInput<CardData>
              key={f.name}
              name={f.name}
              control={control}
              label={f.label}
              type={f.type}
              rules={f.rules}
              formatValue={f.formatValue}
              inputProps={{
                "data-testid": f.name,
                ...f.inputProps,
              }}
              onValueChange={(v) =>
                setCard(
                  (prev) => ({ ...(prev as CardData), [f.name]: v } as CardData)
                )
              }
              onFocus={() => setCardFocus(f.name as keyof CardData)}
            />
          ))}
        </div>

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Оплатить — {cartSum} руб
        </SubmitButton>
      </form>
    </div>
  );
};

export default CardForm;
