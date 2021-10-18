import Loader from 'react-loader-spinner';
import s from './Loader.module.scss';
export default function Spinner() {
  return (
    <>
      <div className={s.spinner}>
        <Loader
          type="Grid"
          color="yellowgreen"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    </>
  );
}
