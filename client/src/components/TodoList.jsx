import React, { useEffect, useState } from 'react'
import Todoitems from './Todoitems'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getTodosAsync } from '../redux/todoSlice'

export default function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector((state)=> state.todos)

    useEffect(()=>{
        dispatch(getTodosAsync());
    }, [dispatch])

    return (
        <section className='bg-zinc-700 rounded-md mt-4 w-full'>
            <ul className='grid grid-cols-1 rounded-md'>
                {todos.length > 0 ? (
                    todos.map((todo, i) => (
                        <Todoitems key={i} id={todo._id} title={todo.title} description={todo.description} complete={todo.complete} />
                    )))
                    : (<p className='text-white text-center p-4'>There is no Todo right now</p>)
                }
            </ul>
        </section>
    )
}
