import { Backdrop, Box, Fade, Modal as MuiModal } from '@mui/material';
import { styles } from './Modal.styles';

export default function StyledModal(props) {
  const { isModalOpen, setIsModalOpen, children } = props;
  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModalOpen}
      onClose={setIsModalOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModalOpen}>
        <Box sx={styles}>{children}</Box>
      </Fade>
    </MuiModal>
  );
}
