import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SelectProps {
  handleChange?: any;
  placeholder: string;
  items: {value: string, valueKey: string}[];
  selectedItem: any;
  name: string;
}

export default function MultipleSelectCustom(props: SelectProps) {
  const { placeholder, handleChange, items, selectedItem, name } = props;

  return (
    <Select
      disableUnderline
      fullWidth
      name={name}
      displayEmpty
      renderValue={selectedItem => {
        if (selectedItem && selectedItem.length === 0) {
          return <span>{placeholder}</span>;
        }
        if (selectedItem) return selectedItem.filter((value: any) => value.length > 0).join(", ");
      }}
      value={Array.isArray(selectedItem) ? selectedItem : []}
      onChange={handleChange}
      variant='standard'
      className='select-custom'
      multiple
      IconComponent={KeyboardArrowDownIcon}
      inputProps={{ 'aria-label': 'Without label' }}
    > 
      { placeholder && placeholder.length && 
        <MenuItem value="" className='select-custom_item'>
          <em>{ placeholder }</em>
        </MenuItem>
      }
      { items && items.map((item) => (
        <MenuItem
          value={item.toString()}
          key={item.toString()}
        >
          {item.toString()}
        </MenuItem>
      ))}
    </Select>
  );
}