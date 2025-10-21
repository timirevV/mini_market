import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { SubmitButton, SubmitInput } from "./style";

type CardData = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
};

interface CardFormProps {
  onSuccess?: () => void;
  cartSum: number;
}

const CardForm: FC<CardFormProps> = ({ onSuccess, cartSum }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CardData>({
    mode: "onChange",
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
  });

  const [card, setCard] = useState<CardData>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [focus, setCardFocus] = useState<keyof CardData | "">("");

  const onSubmit = () => {
    reset();
    setCard({ number: "", name: "", expiry: "", cvc: "" });
    if (onSuccess) onSuccess();
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <Cards
        number={card.number}
        name={card.name}
        expiry={card.expiry}
        cvc={card.cvc}
        focused={focus}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          gap: "10px",
          marginTop: 20,
          flexDirection: "column",
        }}
      >
        <Controller
          name="number"
          control={control}
          rules={{
            required: "Введите номер карты",
            pattern: {
              value: /^[\d\s]{16,23}$/,
              message: "Некорректный номер карты",
            },
          }}
          render={({ field, fieldState }) => (
            <SubmitInput
              {...field}
              label="Номер карты"
              variant="outlined"
              type="tel"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 16);
                const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
                field.onChange(formatted);
                setCard((prev) => ({ ...prev, number: formatted }));
              }}
              onFocus={() => setCardFocus("number")}
              inputProps={{
                inputMode: "numeric",
              }}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          rules={{
            required: "Введите имя владельца карты",
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё\s]+$/,
              message: "Имя должно содержать только буквы",
            },
          }}
          render={({ field, fieldState }) => (
            <SubmitInput
              {...field}
              label="Имя владельца"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                field.onChange(e.target.value);
                setCard((prev) => ({ ...prev, name: e.target.value }));
              }}
              onFocus={() => setCardFocus("name")}
            />
          )}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <Controller
            name="expiry"
            control={control}
            rules={{
              required: "Введите срок действия",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "Формат ММ/ГГ",
              },
            }}
            render={({ field, fieldState }) => (
              <SubmitInput
                {...field}
                label="Срок (ММ/ГГ)"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
                  const formatted = cleaned.replace(
                    /(\d{2})(\d{1,2})?/,
                    (_, mm, yy) => (yy ? `${mm}/${yy}` : mm)
                  );
                  field.onChange(formatted);
                  setCard((prev) => ({ ...prev, expiry: formatted }));
                }}
                onFocus={() => setCardFocus("expiry")}
              />
            )}
          />

          <Controller
            name="cvc"
            control={control}
            rules={{
              required: "Введите CVV",
              pattern: { value: /^\d{3,4}$/, message: "Некорректный CVV" },
            }}
            render={({ field, fieldState }) => (
              <SubmitInput
                {...field}
                label="CVV"
                variant="outlined"
                type="tel"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
                  field.onChange(cleaned);
                  setCard((prev) => ({ ...prev, cvc: cleaned }));
                }}
                onFocus={() => setCardFocus("cvc")}
                inputProps={{
                  maxLength: 4,
                  inputMode: "numeric",
                }}
              />
            )}
          />
        </div>

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Оплатить - {cartSum} руб
        </SubmitButton>
      </form>
    </div>
  );
};

export default CardForm;
