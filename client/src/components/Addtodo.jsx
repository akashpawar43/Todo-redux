import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addTodosAsync } from '../redux/todoSlice';

export default function Addtodo() {
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodosAsync({
            title: title, 
            description: description, 
        }))

    }

    return (
        <section onSubmit={handleSubmit} className='bg-zinc-700 p-8 rounded-md w-full'>
            <form action="" className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-white'>Name</label>
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className='w-full rounded-xl px-4 py-2' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-white'>Description</label>
                    <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} className='w-full rounded-xl px-4 py-2' />
                </div>
                <div className='flex justify-center md:justify-end items-center'>
                    <button type='submit' className='bg-amber-500 rounded-full text-white px-4 py-2'>Add Todo</button>
                </div>
            </form>
        </section>
    )
}
