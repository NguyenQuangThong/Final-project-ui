import Home from '~/pages/Home';
import Class from '~/pages/Class';
import Upload from '~/pages/Upload';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Profile from '~/pages/Profile';
import { HeaderOnly } from '~/components/Layout';
import ClassDetail from '~/pages/ClassDetail';
import ClassDetailHeader from '~/components/Layout/ClassDetailHeader';
import ClassManage from '~/pages/ClassManage';
import File from '~/pages/File';
import Meeting from '~/pages/Meeting';
import ForgotPassword from '~/pages/ForgotPassword';
import ChangeForgotPassword from '~/pages/ForgotPassword/ChangeForgotPassword';
import Request from '~/pages/Request';
import OtherProfile from '~/pages/OtherProfile';
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/class', component: Class },
  { path: '/upload', component: Upload, layout: HeaderOnly },
  { path: '/login', component: Login, layout: null },
  { path: '/signup', component: Signup, layout: null },
  { path: '/profile', component: Profile, layout: HeaderOnly },
  { path: '/class/detail', component: ClassDetail, layout: ClassDetailHeader },
  { path: '/class/manage', component: ClassManage },
  { path: '/class/file', component: File, layout: ClassDetailHeader },
  { path: '/class/meeting', component: Meeting, layout: ClassDetailHeader },
  { path: '/forgot-password', component: ForgotPassword, layout: null },
  { path: '/forgot-password/change', component: ChangeForgotPassword, layout: null },
  { path: '/class/request', component: Request, layout: HeaderOnly },
  { path: '/other-profile', component: OtherProfile, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
