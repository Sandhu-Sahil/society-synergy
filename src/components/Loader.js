import styles from '@/styles/slug.module.css';
import Lottie from 'react-lottie';

function Loader() {
  return (
    <>  
    <div className={styles.loading}>
        <Lottie options={{
          loop: true,
          autoplay: true,
          animationData: require('../data/animationloader1.json'),
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        height={400}
        width={400}
        />
    </div>
    </>
  );
}
export default Loader;
