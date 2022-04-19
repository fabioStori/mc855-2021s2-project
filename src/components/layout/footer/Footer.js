import { StyledModal, TermosDeUso } from 'components';
import { useState } from 'react';
import { useStyles } from './Footer.styles';

export default function Footer() {
  const styles = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <p className={styles.text}>Inventio - 2021</p>
      <span className={styles.termosDeUso} onClick={() => setIsModalOpen(true)}>
        Termos de Uso
      </span>
      <StyledModal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(false)}
      >
        <TermosDeUso />
      </StyledModal>
    </div>
  );
}
