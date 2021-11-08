import { Backdrop, Box, Fade, Modal as MuiModal } from '@mui/material';
import { styles } from './Modal.styles';

export default function StyledModal(props) {
  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.isModalOpen}
      onClose={props.setIsModalOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.isModalOpen}>
        <Box sx={styles}>{props.children}</Box>
      </Fade>
    </MuiModal>
  );
}
