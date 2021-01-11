import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Spinner from 'react-loader-spinner';

export default function Loader() {
  return (
    <Spinner
      type="Rings"
      color="darkblue"
      height={150}
      width={150}
      style={{ textAlign: 'center' }}
    />
  );
}
