import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MultipleTextInputs from '../multiple-text-inputs/MultipleTextInputs';
import { StyledButton, useStyles } from './ContentHeader.styles';

export default function ContentHeader({
  title,
  onButtonClick,
  buttonLabel,
  searchLabel,
  searchPlaceholder,
}) {
  const methods = useForm({ defaultValues: [] });
  const styles = useStyles();
  const { control } = methods;

  const [fieldValue, setFieldValue] = useState([]);

  useEffect(() => {
    if (fieldValue.length > 0) {
      fetch('https://httpstat.us/200', {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      })
        .then((response) => {
          console.log('Searched Values', fieldValue);
        })
        .catch(() => {
          console.log('ERROR ON FORM SUBMISSION');
          return false;
        });
    }
  }, [fieldValue]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <StyledButton variant="contained" onClick={onButtonClick}>
        {buttonLabel}
      </StyledButton>
      <MultipleTextInputs
        name="search"
        control={control}
        hasSearchIcon={true}
        setFieldValue={setFieldValue}
        label={searchLabel}
        placeholder={searchPlaceholder}
      />
    </div>
  );
}
