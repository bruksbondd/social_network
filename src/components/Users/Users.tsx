import React, {FC} from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import {UserType} from "../../types/types";

type PropsTypes = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>

}

const Users: FC<PropsTypes> = ({totalUsersCount, pageSize, onPageChanged, currentPage, users, follow, unfollow, followingInProgress, ...props}) => {
    return (
        <div>
            <h2>Users</h2>
            <Paginator
                totalItemCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />
            <div>
                {
                    users.map((user) => {

                        return (
                            <User key={user.id} user={user} follow={follow} unfollow={unfollow} followingInProgress={followingInProgress}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Users
