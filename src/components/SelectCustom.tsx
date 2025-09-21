import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SelectProps {
  handleChange?: any;
  placeholder: string;
  items: {value: string, valueKey: string | number}[];
  selectedItem: string | number;
  name: string;
  isValid?: boolean;
  readOnly?: boolean;
}

export default function SelectCustom(props: SelectProps) {
  const { placeholder, handleChange, items, selectedItem, name, isValid = true, readOnly = false } = props;

  const renderValue = (value: string | number) => {
    const nameItem = items.find(item => item.valueKey === selectedItem.toString())
    if (nameItem) return <span>{nameItem.value}</span>
    return <span>{placeholder}</span>
  }

  return (
    <Select
      readOnly={readOnly}
      disableUnderline
      fullWidth
      name={name}
      displayEmpty
      renderValue={() => renderValue(selectedItem)}
      value={selectedItem}
      onChange={handleChange}
      variant='standard'
      className={`select-custom ${isValid ? '' : 'invalid'}`}
      IconComponent={KeyboardArrowDownIcon}
      inputProps={{ 'aria-label': 'Without label' }}
    > 
      { placeholder.length && 
        <MenuItem value="" className='select-custom_item'>
          <em>{ placeholder }</em>
        </MenuItem>
      }
      {items.map((item) => (
        <MenuItem
          value={item.valueKey}
          key={item.valueKey}
        >
          {item.value}
        </MenuItem>
      ))}
    </Select>
  );
}