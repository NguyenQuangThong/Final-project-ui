const { default: ClassDetailFooter } = require('../ClassDetailFooter');
const { default: ClassDetailHeader } = require('../ClassDetailHeader');

function ClassDetailLayout({ children }) {
  return (
    <>
      <ClassDetailHeader />
      <div style={{ marginBottom: 150 }}>{children}</div>
      <ClassDetailFooter />
    </>
  );
}
export default ClassDetailLayout;
