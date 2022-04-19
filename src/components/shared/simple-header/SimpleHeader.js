import { useStyles } from './SimpleHeader.styles';

export default function SimpleHeader(props) {
  const { title } = props;
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
    </div>
  );
}
