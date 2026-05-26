import React from 'react';
import Navbar from '../shared/Navbar';
import CompaniesTable from './CompaniesTable';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const Companies=()=>{
    useGetAllCompanies();
    return (
        <div className="min-h-screen bg-pink-200">
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies