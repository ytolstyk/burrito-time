import { useEffect, useState } from "react";
import { Input } from "../styles/inputs";
import { useTimer } from "./useTimer";

type Props = {
  burritoCount: number;
};

export function BurritoCountForm({ burritoCount }: Props) {
  const { updateBurritoCount } = useTimer();
  const [formCount, setFormCount] = useState(burritoCount);

  const handleInputChange = (text: string) => {
    const num = Number(text.replace(/\D/g, ""));

    setFormCount(num);
    updateBurritoCount(num);
  };

  useEffect(() => {
    if (burritoCount === formCount) {
      return;
    }

    setFormCount(burritoCount);
  }, [burritoCount]);

  return (
    <Input
      keyboardType="number-pad"
      placeholder="Total burritos"
      value={String(formCount)}
      onChangeText={handleInputChange}
    />
  );
}
