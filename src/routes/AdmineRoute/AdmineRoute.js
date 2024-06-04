import React from 'react';
import Layout from '../../admine/components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Course from '../../admine/containers/Course/Course';

function AdmineRoute(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route exact path="/course" element={<Course />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default AdmineRoute;