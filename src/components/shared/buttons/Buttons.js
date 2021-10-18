import { Button, styled } from '@mui/material';

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--primary-blue)',
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--secondary-blue)',
}));
