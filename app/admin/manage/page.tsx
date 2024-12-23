import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProductUser";
import ManageClient from "@/app/components/admin/ManageClient";
import WarnıngText from "@/app/components/WarnıngText";


const page = async () => {
    const products = await getProducts({ category: null })
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMİN') {
        return (
            <WarnıngText text="Buraya erişim yasak!!" />
        )
    }
    return (
        <div className="w-full m-2">
            <ManageClient products={products} />
        </div>
    )
}

export default page
