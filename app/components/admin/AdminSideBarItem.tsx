import Link from 'next/link'
import { IconType } from 'react-icons'

interface AdminSideBarItem {
    selected?: boolean
    name: string
    icon: IconType
    url: string
}

const AdminSideBarItem: React.FC<AdminSideBarItem> = ({ selected, name, icon: Icon, url }) => {
    return (
        <Link className={` cursor-pointer flex items-center gap-2 ${selected ? "text-black font-bold" : "text-white-600 font-medium"}`} href={url}>
            <Icon size={25} />
            <div>{name}</div>
        </Link>
    )
}

export default AdminSideBarItem
