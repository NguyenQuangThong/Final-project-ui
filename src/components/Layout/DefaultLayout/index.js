import Header from './Header';
import Footer from './Footer';
function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div>
        <div className="container-fluid">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
