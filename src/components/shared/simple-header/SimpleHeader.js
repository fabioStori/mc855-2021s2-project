import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import {  
  useStyles,
} from './SimpleHeader.styles';

function SimpleHeader(props) {
  const styles = useStyles();

  const [value, setValue] = useState([]);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case ',':
      case ' ': {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          setValue([...value, event.target.value]);
        }
        break;
      }
      default:
    }
  };

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{props.title}</p>
    </div>
  );
}

export default SimpleHeader;
