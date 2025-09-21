import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

interface SelectProps {
  handleChange?: any;
  handleBlurChange?: any;
  placeholder: string;
  controlledValue: number | string;
  name: string;
  suffix?: string;
  prefix?: string;
  decimalLength?: number;
  decimalLimit?: number;
  allowDecimals?: boolean;
  toolTipTitle?: string;
  isValid?: boolean;
  readOnly?: boolean;
}

export default function InputNumberCustom(props: SelectProps) {
  const {
    placeholder,
    handleChange,
    controlledValue,
    name,
    handleBlurChange,
    decimalLength,
    decimalLimit = 2,
    suffix,
    prefix,
    allowDecimals = true,
    toolTipTitle = "",
    isValid = true,
    readOnly = false
  } = props;

  const [value, setValue] = useState<string | number>();


  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (valueEvent, name, values) => {

    if (!valueEvent) {
      setValue('');
      return;
    }

    setValue(valueEvent);
    if (values) {
      const floatValue = values.float;
      handleChange({target: { value: floatValue, name }});
    }
  };

  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue]);
  
  return (
    <Tooltip title={toolTipTitle}>
      <CurrencyInput
        readOnly={readOnly}
        id="input-example"
        className={`input-custom ${isValid ? '' : 'invalid'}`}
        placeholder={placeholder}
        disableGroupSeparators
        name={name}
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimalsLimit={decimalLimit}
        fixedDecimalLength={decimalLength}
        allowDecimals={allowDecimals}
        onBlur={handleBlurChange}
        onKeyDown={handleBlurChange}
        onValueChange={handleOnValueChange}
        autoComplete="off"
      />
    </Tooltip>
  );
}