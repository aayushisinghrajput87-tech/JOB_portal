import { PopoverContent, Popover, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Button } from '../ui/button'
import { Link,useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import {toast} from 'sonner'
import axios from 'axios'
import {setUser} from '@/redux/authSlice'

const Navbar = () => {
    const {user} = useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logoutHandler=async()=>{
        try{
            const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white w-full'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 w-full'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#E83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-5'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                               <Link to="/login"><Button >Login</Button></Link> 
                               <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="h-15 w-15 rounded-full overflow-hidden cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" className="rounded-full" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className="h-15 w-15 rounded-full overflow-hidden cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" className="rounded-full" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button ><Link to="/profile">View Profile</Link></Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler}>Logout</Button>
                                        </div>

                                    </div>

                                </PopoverContent >
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>

    )
}
export default Navbar