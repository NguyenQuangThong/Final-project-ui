import Header from './Header';
import Footer from './Footer';
function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100%', marginBottom: '-50px' }}>
        {children}
        <div style={{ height: '50px' }}></div>
      </div>
      <Footer />
    </>
  );
}
export default DefaultLayout;
