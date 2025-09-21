import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabsProps {
  handleChange?: any;
  value: string;
  vertical?: boolean;
  labels: {
    label: string,
    name: string,
    color?: string,
    bold?: boolean,
    icon?: any
  }[];
}

export default function TabsCustom(props: TabsProps) {
  const { value, handleChange, labels, vertical = false } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        orientation={vertical ? "vertical" : "horizontal"}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#b2bf00"
          }
        }}
      >
        {
          labels.map(({ label, name, color = '', bold = false, icon = '' }) => (              
              <Tab iconPosition='start' icon={icon ? icon : null} sx={{fontWeight: `${bold ? 'bold': 'normal'}`, color: color, borderTop: `${bold ? '1px solid black' : 'none'}`}} label={label} key={name} value={name}/>          
          ))
        }
      </Tabs>
    </Box>
  );
}