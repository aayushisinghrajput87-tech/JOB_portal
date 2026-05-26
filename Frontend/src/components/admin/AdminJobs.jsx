import React from 'react';
import Navbar from '../shared/Navbar';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminJobs=()=>{
    useGetAllAdminJobs();
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 flex flex-col">
            <Navbar />
            <div className='flex-1 flex flex-col items-center justify-start'>
                <div className='w-full max-w-6xl mt-10'>
                    <AdminJobsTable buttonText="New Jobs" buttonPath="/admin/jobs/create"/>
                </div>
            </div>
        </div>
    )
}

export default AdminJobs;