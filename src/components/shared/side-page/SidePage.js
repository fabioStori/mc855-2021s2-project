import { useState } from 'react';
import {
  StyledArrowForwardSharpIcon,
  StyledClose,
  StyledDrawer,
  useStyles,
} from './SidePage.styles';

export default function SidePage(props) {
  const { onClose, children } = props;
  const defaultDrawerWidth = '40vw';
  const styles = useStyles();
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const [isExpanded, setIsExpanded] = useState(true);

  const onClick = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setDrawerWidth('12px');
    } else {
      setDrawerWidth('40vw');
    }
  };
  return (
    <StyledDrawer
      className={styles.drawer}
      variant="permanent"
      anchor="right"
      PaperProps={{
        style: {
          width: drawerWidth,
          backgroundColor: isExpanded ? 'var(--white)' : 'var(--primary-blue)',
        },
      }}
    >
      <StyledArrowForwardSharpIcon
        onClick={onClick}
        style={{
          transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      />
      <div className={isExpanded ? styles.visible : styles.notVisible}>
        <div className={styles.close}>
          <StyledClose onClick={onClose} />
        </div>
        {children}
      </div>
    </StyledDrawer>
  );
}
