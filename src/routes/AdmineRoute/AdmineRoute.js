import React from 'react';
import Layout from '../../admine/components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Course from '../../admine/containers/Course/Course';
import Subcourse from '../../admine/containers/Subcourse/Subcourse';
import Students from '../../admine/containers/Students/Students';

function AdmineRoute(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route exact path="/course" element={<Course />} />
                    <Route exact path="/subcourse" element={<Subcourse />} />
                    <Route exact path="/students" element={<Students/>} />
                </Routes>
            </Layout>
        </div>
    );
}

export default AdmineRoute;