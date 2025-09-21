import { Input } from '@mui/material';

interface SelectProps {
  handleChange?: any;
  handleBlurChange?: any;
  placeholder: string;
  controlledValue: string | number;
  name: string;
  type?: string;
  isValid?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
}

export default function InputCustom(props: SelectProps) {
  const { placeholder, handleChange, controlledValue, name, type = "string", handleBlurChange, isValid = true, readOnly = false, autoComplete = "off" } = props;
  
  return (
    <Input
      readOnly={readOnly}
      type={type}
      disableUnderline
      fullWidth
      placeholder={placeholder}
      name={name}
      value={controlledValue}
      onChange={handleChange}
      onBlur={handleBlurChange}
      className={`input-custom ${isValid ? '' : 'invalid'}`}
      inputProps={{ 'aria-label': 'Without label' }}
      autoComplete={autoComplete}
    /> 
  );
}