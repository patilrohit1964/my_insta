import { Avatar } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEditProfileMutation } from '../redux/api/authApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const { user } = useSelector(state => state?.auth);
    const imgRef = useRef(null);
    const [editProfile, { data, isSuccess, isError, isLoading, error }] = useEditProfileMutation();
    const [formField, setFormField] = useState({
        username: user?.username,
        bio: user?.bio,
        profilePicture: user?.profilePicture,
        gender: user?.gender,
    });

    const editFormHandler = async (e) => {
        const formData = new FormData();
        if (e.target.files) {
            const file = e.target.files[0];
            formData.append('profilePicture', file);
            setFormField(prev => ({ ...prev, profilePicture: file }));
        } else {
            setFormField(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }

        // try {
        //     const res = await editProfile(formData).unwrap();
        //     console.log(res);
        // } catch (err) {
        //     console.error(err);
        // }
        console.log(formField);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
        }
        if (isError) {
            toast.error(error?.message || "Something went wrong");
            console.log(error);
        }
    }, [isError, isSuccess, error, data]);

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
                    <input
                        type="file"
                        name='profilePicture'
                        className='hidden'
                        ref={imgRef}
                        onChange={editFormHandler}
                        accept='image/*'
                    />
                    <button
                        className='bg-[#0095f6] hover:bg-[#6ac3ff] rounded-lg p-2 text-white'
                        onClick={() => imgRef.current.click()}
                    >
                        Change Photo
                    </button>
                </div>
                <div>
                    <h1 className='font-bold text-xl'>Bio</h1>
                    <textarea
                        className='focus-visible:ring-transparent outline-none border border-gray-500 p-2'
                        value={formField?.bio}
                        name='bio'
                        cols={84}
                        onChange={editFormHandler}
                    />
                </div>
                <div>
                    <h1 className='font-bold mb-2'>Gender</h1>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            name="gender"
                            value={formField.gender || ''}
                            label="Gender"
                            onChange={editFormHandler}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='flex items-center justify-end'>
                    <button
                        className='w-32 bg-[#0095f6] hover:bg-[#6ac3ff] p-2 rounded-md text-white'
                        onClick={editFormHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin inline" /> : "Save"}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default EditProfile;