import Home from '~/pages/Home';
import Class from '~/pages/Class';
import Upload from '~/pages/Upload';
import { HeaderOnly } from '~/components/Layout';
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/class', component: Class },
  { path: '/upload', component: Upload, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
