import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { PopoverContent, PopoverTrigger, Popover } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler=async(status,id)=>{
        try{
            const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
            }
        }catch(error){
            const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
            toast.error(msg);
        }
    }
    

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.length > 0 ? (
                            applicants.map((item, idx) => (
                                <TableRow key={item._id || idx}>
                                    <TableCell>{item.applicant?.fullname || '-'}</TableCell>
                                    <TableCell>{item.applicant?.email || '-'}</TableCell>
                                    <TableCell>{item.applicant?.contact || item.applicant?.phoneNumber || '-'}</TableCell>
                                    <TableCell>{item.applicant?.profile?.resume ? <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer">View</a> : '-'}</TableCell>
                                    <TableCell>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</TableCell>
                                    <TableCell className="float-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal size={24} color="gray" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortlistingStatus.map((status, index) => (
                                                        <div onClick={()=>statusHandler(status,item?._id)} key={index} className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                                                            <span>{status}</span>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">No applicants found.</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default ApplicantsTable