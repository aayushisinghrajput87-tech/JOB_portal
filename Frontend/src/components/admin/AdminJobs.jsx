import React from 'react';
import Navbar from '../shared/Navbar';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminJobs=()=>{
    useGetAllAdminJobs();
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <AdminJobsTable buttonText="New Jobs" buttonPath="/admin/jobs/create"/>
            </div>
        </div>
    )
}

export default AdminJobs;