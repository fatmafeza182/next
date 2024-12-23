"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import AuthContainer from "../Container/AuthContainer"
import Heading from "../General/Heading"
import Input from "../General/Input"
import Button from "../General/Button"
import { BsGoogle } from "react-icons/bs"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { User } from "@prisma/client"



interface loginClientProps {
    currentUser: undefined,
}


const LoginClient: React.FC<loginClientProps> = ({ currentUser }) => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((response) => {
            // Giriş başarılıysa
            if (response?.ok) {
                router.push('/cart')
                // window.location.reload()
                router.refresh()
                toast.success('Giriş işlemi başarılı')
            }
            // Hata mesajı varsa
            if (response?.error) {
                toast.error(response.error)
            }
        })
    }
    const handleGoogleSignIn = () => {
        signIn('google', { redirect: true });
    };
    useEffect(() => {
        if (currentUser) {
            router.push('/cart')
            router.refresh()
        }
    }, [])


    return (
        <AuthContainer>
            <div className="w-full md:w-[500px] rounded-md shadow-lg p-2">
                <Heading text="Login" center />
                <Input
                    type="email"
                    placeholder="Email giriniz"
                    id="email"
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    type="password"
                    placeholder="Şifre Giriniz"
                    id="password"
                    register={register}
                    errors={errors}
                    required
                />
                <Button text="Giriş yap" onClick={handleSubmit(onSubmit)} />
                <div className="text-center my-2 text-sm text-red-500">
                    Daha önce kayıt olmadıysan{' '}
                    <Link className="underline" href="/register">
                        buraya tıkla
                    </Link>
                </div>
                <div className="text-center my-2 font-bold">OR</div>
                <Button
                    text="Google ile giriş yap"
                    icon={BsGoogle}
                    outline
                    onClick={() => signIn('google')}
                />
            </div>
        </AuthContainer>
    )
}

export default LoginClient
