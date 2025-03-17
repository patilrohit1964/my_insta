import { Avatar } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRef } from 'react';
import { useSelector } from 'react-redux';


const EditProfile = () => {
    const { user } = useSelector(state => state?.auth);
    const imgRef = useRef(null);
    return (
        <div className='flex max-w-2xl mx-auto pl-10'>
            <section className='flex flex-col gap-6 w-full my-8'>
                <h1 className='font-bold text-xl'>Edit Profile</h1>
                <div className='flex items-center justify-between bg-gray-100 rounded-xl p-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar src={user?.profilePicture} alt='not found' />
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-sm'>{user?.username}</h1>
                            <span className='text-gray-600 text-sm'>{user?.bio || "Bio here..."}</span>
                        </div>
                    </div>
                    <input type="file" className='hidden' ref={imgRef} />
                    <button className='bg-[#0095f6] hover:bg-[#6ac3ff] rounded-lg p-2 text-white' onClick={() => imgRef.current.click()}>Change Photo</button>
                </div>
                <div>
                    <h1 className='font-bold text-xl'>Bio</h1>
                    <textarea className='focus-visible:ring-transparent outline-none border border-gray-500 p-2' name='bio' cols={84} />
                </div>
                <div>
                    <h1 className='font-bold mb-2'>Gender</h1>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Age</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Male</MenuItem>
                            <MenuItem value={20}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='flex items-center justify-end'>
                    <button className='w-32 bg-[#0095f6] hover:bg-[#6ac3ff] p-2 rounded-md text-white'>Submit</button>
                </div>
            </section>
        </div>
    )
}

export default EditProfile