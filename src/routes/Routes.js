import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import ForgotPassword from '../components/auth/forgot-password/ForgotPassword';
import Login from '../components/auth/login/Login';
import Register from '../components/auth/register/Register';
import Home from '../components/home/Home';
import Exams from '../components/exams/Exams';
import ExamForm from '../components/exams/ExamForm';
import Reports from '../components/reports/Reports';
import Members from '../components/members/Members';
import Admin from '../components/admin/Admin';
import ExamLogForm from '../components/exam-logs/ExamLogForm';
import Role from '../components/admin/Role/Role';
import RouteError from '../components/route/RouteError';
import EmailVerify from '../components/auth/email-verify/EmailVerify';
import PrivateRoutes from '../components/route/PrivateRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword></ForgotPassword>
    },
    {
        path: '/signup-verify',
        element: <EmailVerify></EmailVerify>
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes>
            <Dashboard></Dashboard>
        </PrivateRoutes>,
        errorElement: <RouteError></RouteError>,
        children: [
            {
                path: 'home',
                element: <PrivateRoutes>
                    <Home></Home>
                </PrivateRoutes>
            },
            {
                path: 'members',
                element: <PrivateRoutes>
                    <Members></Members>
                </PrivateRoutes>
            }, 
            {
                path: 'exams',
                element: <PrivateRoutes>
                    <Exams></Exams>
                </PrivateRoutes>
            },
            {
                path: 'exam-log/:exam_log_id',
                element: <PrivateRoutes>
                    <ExamLogForm></ExamLogForm>
                </PrivateRoutes>
            },
            {
                path: 'exam-log/:exam_id/:exam_log_id',
                element: <PrivateRoutes>
                    <ExamLogForm></ExamLogForm>
                </PrivateRoutes>
            },
            {
                path: 'exams/:exam_id',
                element: <PrivateRoutes>
                    <ExamForm></ExamForm>
                </PrivateRoutes>
            },
            {
                path: 'exams/course/:course_id',
                element: <PrivateRoutes>
                    <Exams></Exams>
                </PrivateRoutes>
            },
            {
                path: 'reports',
                element: <PrivateRoutes>
                    <Reports></Reports>
                </PrivateRoutes>
            },
            {
                path: 'admin',
                element: <PrivateRoutes>
                    <Admin></Admin>
                </PrivateRoutes>,
                children: [
                    {
                        path: 'role',
                        element: <PrivateRoutes>
                            <Role></Role>
                        </PrivateRoutes>
                    }
                ]
            },
        ]
    }
]);

export default router;