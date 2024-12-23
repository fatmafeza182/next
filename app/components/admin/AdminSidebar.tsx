"use client"
import AdminSideBarItem from "./AdminSideBarItem"
import { MdDashboard } from "react-icons/md";
import { MdOutlineBorderInner } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
    const pathname = usePathname()
    const adminPanel = [
        {
            name: "Ürünler",
            icon: MdDashboard,
            url: "/admin"
        },
        {
            name: "Ürün oluştur",
            icon: MdOutlineBorderInner,
            url: "/admin/create"
        },
        {
            name: "Ürünleri yönet",
            icon: MdOutlineBorderInner,
            url: "/admin/manage"
        },
        {
            name: "Siparişlerim",
            icon: IoMdCreate,
            url: "/admin/order"
        }
    ]
    return (
        <div className="w-1/5 border-r h-screen p-4 bg-white-600">
            <div className="space-y-4">
                {
                    adminPanel.map((admin, i) => (
                        <AdminSideBarItem key={i} selected={pathname == admin.url} icon={admin.icon} name={admin.name} url={admin.url} />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminSidebar
