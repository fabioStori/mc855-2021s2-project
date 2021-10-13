import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  StyledAutoComplete,
  StyledButton,
  StyledTextField,
  useStyles,
} from './ContentHeader.styles';

function ContentHeader(props) {
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
      <StyledButton variant="contained" onClick={props.onButtonClick}>
        {props.buttonLabel}
      </StyledButton>
      <StyledAutoComplete
        multiple
        freeSolo
        options={[]}
        value={value}
        limitTags={2}
        id="search-input"
        filterSelectedOptions
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => setValue(newValue)}
        renderInput={(params) => {
          params.inputProps.onKeyDown = handleKeyDown;
          return (
            <StyledTextField
              {...params}
              size="small"
              variant="outlined"
              label={props.searchLabel}
              placeholder={props.searchPlaceholder}
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          );
        }}
      />
    </div>
  );
}

export default ContentHeader;
