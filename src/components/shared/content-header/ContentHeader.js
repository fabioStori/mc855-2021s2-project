import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import MultipleTextInputs from '../multiple-text-inputs/MultipleTextInputs';
import { StyledButton, useStyles } from './ContentHeader.styles';

export default function ContentHeader({
  title,
  onButtonClick,
  buttonLabel,
  searchLabel = '',
  searchPlaceholder = '',
  setFieldValue = null,
  hasInput = true,
}) {
  const methods = useForm({ defaultValues: [] });
  const styles = useStyles();
  const { control } = methods;

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <StyledButton variant="contained" onClick={onButtonClick}>
        {buttonLabel}
      </StyledButton>
      {hasInput && (
        <Box width={{ xs: '100%', md: '40%' }}>
          <MultipleTextInputs
            name="search"
            control={control}
            hasSearchIcon
            setFieldValue={setFieldValue}
            label={searchLabel}
            placeholder={searchPlaceholder}
          />
        </Box>
      )}
    </div>
  );
}
