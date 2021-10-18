import { CheckCircle, Close, Error } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

/*
Usage example:
<Snackbar
  open={openSuccessSnackbar}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  message="Item cadastrado com sucesso"
  action={
    <SnackbarAction
      handleClose={handleSnackbarClose}
      handleUndo={handleSnackbarClose}
    />
  }
/> */

export default function SnackbarAction({
  handleClose,
  handleUndo,
  success = true,
}) {
  return (
    <>
      <Button color="primary" size="small" onClick={handleUndo}>
        DESFAZER
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );
}
