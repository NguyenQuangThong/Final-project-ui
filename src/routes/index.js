import Home from '~/pages/Home';
import Class from '~/pages/Class';
import Upload from '~/pages/Upload';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Profile from '~/pages/Profile';
import { HeaderOnly } from '~/components/Layout';
import ClassDetail from '~/pages/ClassDetail';
import ClassDetailHeader from '~/components/Layout/ClassDetailHeader';
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/class', component: Class },
  { path: '/upload', component: Upload, layout: HeaderOnly },
  { path: '/login', component: Login, layout: null },
  { path: '/signup', component: Signup, layout: null },
  { path: '/profile', component: Profile, layout: null },
  { path: '/class/detail', component: ClassDetail, layout: ClassDetailHeader },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
