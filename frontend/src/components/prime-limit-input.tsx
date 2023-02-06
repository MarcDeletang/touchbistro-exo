import { TextField } from "@mui/material";
import React, { useCallback, useState } from "react";

export interface PrimeLimitInputProps {
  max: number;
  min: number;
  current: string;
  setCurrent: (current: string) => unknown;
}

export const PrimeLimitInput = ({
  min,
  max,
  current,
  setCurrent,
}: PrimeLimitInputProps) => {
  const [error, setError] = useState(false);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const newValue = Number(e.target.value);

      if (Number.isNaN(newValue) || newValue < min || newValue > max) {
        setError(true);
        return;
      }
      setCurrent(newValue.toString());
      setError(false);
    },
    [min, max, setCurrent, setError]
  );

  return (
    <TextField
      error={error}
      helperText="Your value must be between 3 and 1 000 000"
      name="max"
      type="number"
      value={current}
      onChange={onChange}
      label="Choose your target value"
    />
  );
};
