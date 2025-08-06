import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
      <div className="d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>  
  );
}
// variant="primary"
//  style={{ height: '100vh' }}
export default LoadingSpinner;