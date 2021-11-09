import { Controller } from 'react-hook-form';
import { StyledTextField, useStyles } from './TextInput.styles';

export default function TextInput({
  name,
  control,
  label,
  placeholder,
  isRequired = true,
  helperText = '',
  style = {},
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
            label={label}
            value={value}
            style={style}
            onChange={onChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error ? 'Campo obrigatório' : helperText}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}
    />
  );
}
