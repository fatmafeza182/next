import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'

const Adminlayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex gap-2'>
            <AdminSidebar />
            {children}
        </div>

    )
}

export default Adminlayout
