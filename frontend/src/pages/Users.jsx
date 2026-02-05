import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/users';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await getUsers();
                setUsers(response.data)
            } catch (error) {
                console.error("Data not fetched", error);
            }
        }

        getData()

    }, [])
    return (
        <>
            {
                users.map((val, index) => {
                    return (
                        <div className="user-contain" key={index}>
                            <div className='user'>User:{val.username}</div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Users
