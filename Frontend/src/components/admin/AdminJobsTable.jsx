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
import { Eye } from 'lucide-react'


const AdminJobsTable = ({ buttonText = "New Company", buttonPath = "/admin/companies/create" }) => {
    const { companies = [] } = useSelector(store => store.company);
    const {allAdminJobs=[]}=useSelector(store=>store.job);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();


    const filteredJobs = allAdminJobs.filter(job =>
        (job.title && job.title.toLowerCase().includes(filterText.toLowerCase())) ||
        (job.company?.name && job.company.name.toLowerCase().includes(filterText.toLowerCase()))
    );

    // Edit Modal State
    const [editModal, setEditModal] = useState({ open: false, job: null });
    const [editInput, setEditInput] = useState({ title: '', description: '', requirements: '', salary: '', location: '', jobType: '', experience: '', position: 0 });
    const [saving, setSaving] = useState(false);

    const openEditModal = (job) => {
        setEditInput({
            title: job.title || '',
            description: job.description || '',
            requirements: job.requirements || '',
            salary: job.salary || '',
            location: job.location || '',
            jobType: job.jobType || '',
            experience: job.experience || '',
            position: job.position || 0
        });
        setEditModal({ open: true, job });
    };

    const closeEditModal = () => {
        setEditModal({ open: false, job: null });
    };

    const handleEditChange = (e) => {
        setEditInput({ ...editInput, [e.target.name]: e.target.value });
    };

    const saveEdit = async () => {
        setSaving(true);
        try {
            const id = editModal.job?._id;
            // Map experience to experienceLevel for backend compatibility
            const payload = {
                ...editInput,
                experienceLevel: editInput.experience,
            };
            const res = await fetch(`/api/job/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                alert('Job updated successfully');
                closeEditModal();
                // Optionally: refresh jobs list here
            } else {
                alert(data.message || 'Failed to update job');
            }
        } catch (error) {
            alert('Failed to update job');
        }
        setSaving(false);
    };

    return (
        <div className="w-full px-6">
            {/* Edit Job Modal */}
            {editModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input name="title" value={editInput.title} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <input name="description" value={editInput.description} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Requirements</label>
                                <input name="requirements" value={editInput.requirements} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Salary</label>
                                <input name="salary" value={editInput.salary} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input name="location" value={editInput.location} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Job Type</label>
                                <input name="jobType" value={editInput.jobType} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Experience</label>
                                <input name="experience" value={editInput.experience} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">No of Position</label>
                                <input name="position" type="number" value={editInput.position} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6 justify-end">
                            <button onClick={closeEditModal} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-white">Cancel</button>
                            <button onClick={saveEdit} disabled={saving} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Header Section with Filter and Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex-1 max-w-xs">
                    <Input
                        placeholder="Filter by name and role"
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
                        {filteredJobs.length <= 0 ? (
                            <TableRow className="hover:bg-gray-50">
                                <TableCell colSpan="4" className="text-center py-12 text-red-500 text-sm">
                                    You haven't posted any jobs yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredJobs?.map((job) => (
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
                                        {job?.createdAt?.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="w-1/5 px-6 py-4 text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-1 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent side="left" className="w-40 p-0">
                                                <div onClick={() => openEditModal(job)} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                                    <Edit2 className="h-4 w-4" />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors'>
                                                    <Eye className='w-4'/>
                                                    <span>Applicants</span>
                                                </div>
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