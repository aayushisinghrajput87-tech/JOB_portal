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


const CompaniesTable = ({ buttonText = "New Company", buttonPath = "/admin/companies/create" }) => {
    const { companies = [] } = useSelector(store => store.company);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const filteredCompanies = companies.filter(company => 
        company.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="w-full px-6 py-4">
            {/* Header Section with Filter and Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex-1 max-w-xs">
                    <Input 
                        placeholder="Filter by name" 
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="h-10 border-pink-300 focus:ring-2 focus:ring-pink-200 bg-pink-50"
                    />
                </div>
                <Button onClick={() => navigate(buttonPath)} className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white h-10 px-8 font-semibold shadow-md rounded-lg transition-all duration-200">
                    {buttonText}
                </Button>
            </div>

            {/* Table Container */}
            <div className="border border-pink-200 rounded-2xl overflow-hidden bg-white/90 shadow-lg">
                <Table>
                    <TableCaption className="py-3 text-pink-500 text-sm">A list of your recent registered companies</TableCaption>
                    <TableHeader className="bg-pink-50 border-b border-pink-200">
                        <TableRow className="hover:bg-gray-50">
                            <TableHead className="w-1/5 px-6 py-4 text-left text-xs font-semibold text-gray-700">Logo</TableHead>
                            <TableHead className="w-2/5 px-6 py-4 text-left text-xs font-semibold text-gray-700">Name</TableHead>
                            <TableHead className="w-1/5 px-6 py-4 text-left text-xs font-semibold text-gray-700">Date</TableHead>
                            <TableHead className="w-1/5 px-6 py-4 text-right text-xs font-semibold text-gray-700">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCompanies.length <= 0 ? (
                            <TableRow className="hover:bg-pink-50">
                                <TableCell colSpan="4" className="text-center py-12 text-pink-500 text-base font-semibold">
                                    You haven't registered any companies yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCompanies?.map((company) => (
                                <TableRow key={company._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <TableCell className="w-1/5 px-6 py-4">
                                        <img src={company.logo} alt={company.name} className="h-12 w-12 rounded-full object-cover" />
                                    </TableCell>
                                    <TableCell className="w-2/5 px-6 py-4 text-sm font-medium text-gray-900">
                                        {company.name}
                                    </TableCell>
                                    <TableCell className="w-1/5 px-6 py-4 text-sm text-gray-600">
                                        {company.createdAt.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="w-1/5 px-6 py-4 text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-1 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent side="left" className="w-40 p-0">
                                                <button onClick={()=>navigate(`/admin/companies/${company._id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
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

export default CompaniesTable