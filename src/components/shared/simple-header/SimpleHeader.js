import { useEffect, useState } from 'react';
import { useStyles } from './SimpleHeader.styles';

function SimpleHeader(props) {
  const styles = useStyles();

  const [value, setValue] = useState([]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{props.title}</p>
    </div>
  );
}

export default SimpleHeader;
