import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'



//const skills = ["Html", "Css", "Javascript", "Reactjs"];
const Profile = () => {
    const [open,setOpen]=useState(false);
    const [isResume, setIsResume] = useState(true);
    const {user}=useSelector(store=>store.auth);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            
            <div className='max-w-4xl mx-auto px-4 my-5'>
                
                {/* --- PROFILE CARD --- */}
                <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm'>
                    
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24">
                                <AvatarImage 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ584acfWMPuHP7nRm1z5_Yt5zLmKyGrANsQ&s" 
                                    alt="profile" 
                                />
                            </Avatar>
                            
                            <div>
                                {/* Name Font adjusted to look closer to image */}
                                <h1 className='font-bold text-2xl'>{user?.fullname}</h1>
                                <p className='text-gray-500 mt-1 max-w-md text-sm'>
                                   {user?.profile?.bio}
                                </p>
                            </div>
                        </div>

                        {/* ✅ FIXED: Edit Button is now BLACK to match the photo */}
                        <Button onClick={()=>setOpen(true)} className="h-10 w-10 bg-black hover:bg-gray-800 text-white rounded-lg p-0 border border-black">
                            <Pen className="h-5 w-5 text-gray-300"/>
                        </Button>
                    </div>

                    <div className='my-6 space-y-3'>
                        <div className='flex items-center gap-3 text-gray-600 text-sm font-medium'>
                            <Mail className="h-4 w-4" />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 text-gray-600 text-sm font-medium'>
                            <Contact className="h-4 w-4" />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='my-6'>
                        <h1 className='font-bold text-base mb-2'>Skills</h1>
                        <div className='flex items-center gap-2'>
                            {
                                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                    <Badge key={index} className="bg-black text-white hover:bg-gray-800 px-3 py-1 rounded-full text-sm font-normal">
                                        {item}
                                    </Badge>
                                )) : <span>NA</span>
                            }
                        </div>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-medium">Resume</Label>
                        {
                            isResume ? (
                                <a target='_blank' href={user?.profile?.resume} className='text-blue-600 w-full hover:underline cursor-pointer text-sm font-medium' rel="noopener noreferrer">
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            ) : <span>NA</span>
                        }
                    </div>
                </div>

                {/* --- APPLIED JOBS SECTION --- */}
                <div className='mt-8 bg-white'>
                    {/* Fixed: Font size increased to match visual hierarchy */}
                    <h1 className='font-bold text-xl mb-5'>Applied Jobs</h1>
                    <AppliedJobsTable />
                </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
            </div>
        </div>
    )
}

export default Profile