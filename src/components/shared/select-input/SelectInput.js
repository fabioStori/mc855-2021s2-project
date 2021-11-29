import { MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';
import { StyledTextField, useStyles } from './SelectInput.styles';

export default function SelectInput({
  name,
  label,
  values,
  control,
  defaultValue,
  style = {},
  placeholder = '',
  helperText = '',
  isRequired = true,
}) {
  const styles = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={styles.wrapper}>
          <StyledTextField
            size="small"
            variant="outlined"
            fullWidth
            select
            value={value}
            label={label}
            defaultValue={defaultValue}
            style={style}
            onChange={onChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error ? 'Campo obrigatório. ' : helperText}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {values.map((field) => (
              <MenuItem key={field.name} value={field.value}>
                {field.name}
              </MenuItem>
            ))}
          </StyledTextField>
        </div>
      )}
    />
  );
}
