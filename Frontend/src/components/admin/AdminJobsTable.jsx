import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { MoreHorizontal } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


const AdminJobsTable = ({ buttonText = "New Company", buttonPath = "/admin/companies/create" }) => {
    const { companies = [] } = useSelector(store => store.company);
    const {allAdminJobs=[]}=useSelector(store=>store.job);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const filteredCompanies = allAdminJobs.filter(job =>
        job.title.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="w-full px-6">
            {/* Header Section with Filter and Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex-1 max-w-xs">
                    <Input
                        placeholder="Filter by name"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="h-10 border-gray-300"
                    />
                </div>
                <Button onClick={() => navigate(buttonPath)} className="bg-black hover:bg-gray-800 text-white h-10 px-8">
                    {buttonText}
                </Button>
            </div>

            {/* Table Container */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <Table>
                    <TableCaption className="py-3 text-gray-500 text-sm">A list of your recent posted jobs</TableCaption>
                    <TableHeader className="bg-gray-50 border-b border-gray-200">
                        <TableRow className="hover:bg-gray-50">
                            <TableHead className="w-1/5 px-6 py-4 text-left text-xs font-semibold text-gray-700">Company Name</TableHead>
                            <TableHead className="w-2/5 px-6 py-4 text-left text-xs font-semibold text-gray-700">Role</TableHead>
                            <TableHead className="w-1/5 px-6 py-4 text-left text-xs font-semibold text-gray-700">Date</TableHead>
                            <TableHead className="w-1/5 px-6 py-4 text-right text-xs font-semibold text-gray-700">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCompanies.length <= 0 ? (
                            <TableRow className="hover:bg-gray-50">
                                <TableCell colSpan="4" className="text-center py-12 text-red-500 text-sm">
                                    You haven't posted any jobs yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCompanies?.map((job) => (
                                <TableRow key={job._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    {/*<TableCell className="w-1/5 px-6 py-4">
                                        <img src={company.logo} alt={company.name} className="h-12 w-12 rounded-full object-cover" />
                                    </TableCell> */}
                                    <TableCell className="w-2/5 px-6 py-4 text-sm font-medium text-gray-900">
                                        {job?.company?.name}
                                    </TableCell>
                                    <TableCell className="w-2/5 px-6 py-4 text-sm font-medium text-gray-900">
                                        {job?.title}
                                    </TableCell>
                                    <TableCell className="w-1/5 px-6 py-4 text-sm text-gray-600">
                                        {job?.createdAt.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="w-1/5 px-6 py-4 text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-1 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent side="left" className="w-40 p-0">
                                                <button onClick={() => navigate(`/admin/jobs/${job._id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                                    <Edit2 className="h-4 w-4" />
                                                    <span>Edit</span>
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobsTable