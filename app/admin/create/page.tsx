import { getCurrentUser } from "@/app/actions/getCurrentUser"
import AuthContainer from "@/app/components/Container/AuthContainer";
import WarnıngText from "@/app/components/WarnıngText";
import CreateForm from "../../components/admin/CreateForm";


const CreateProduct = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMİN') {
        return (
            <WarnıngText text="Buraya erişim yasak!!" />
        )
    }
    return (
        <AuthContainer>
            <CreateForm />
        </AuthContainer>
    )
}

export default CreateProduct
