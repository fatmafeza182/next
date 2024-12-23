"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { FaGoogle } from 'react-icons/fa'
import AuthContainer from "../Container/AuthContainer"
import Button from "../General/Button"
import Heading from "../General/Heading"
import Input from "../General/Input"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { useEffect } from "react"






interface RegisterClientProps {
    currentUser: User | null | undefined
}
const RegisterClient: React.FC<RegisterClientProps> = ({ currentUser }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success('Kullanıcı Olusturuldu...')
                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false, // Redirect işlemi yapılmasın
                }).then((callback) => {
                    if (callback?.ok) {
                        router.push('/cart');
                        toast.success('Login İşlemi Başarılı...');
                    } else {
                        toast.error('Giriş işlemi sırasında hata oluştu');
                    }
                });

            })
            .catch((error) => {
                console.error('Hata oluştu:', error);
                toast.error('Kayıt işlemi sırasında bir hata oluştu');
            });
    };

    useEffect(() => {
        if (currentUser) {
            router.push('/cart')
            router.refresh();
        }
    }, [])
    return (
        <AuthContainer>
            <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
                <Heading text="Register" center />
                <Input placeholder="Ad" type="text" id="name" register={register} errors={errors} required />
                <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required />
                <Input placeholder="Parola" type="password" id="password" register={register} errors={errors} required />
                <Button text="Kayıt Ol" onClick={handleSubmit(onSubmit)} />
                <div className="text-center my-2 text-sm text-red-500">Daha Önceden Kayıt Olduysan <Link className="underline " href="/login">buraya tıkla</Link></div>
                <div className="text-center my-2 font-bold text-lg">OR</div>
                <Button text="Google İle Üye Ol" icon={FaGoogle} outline onClick={() => signIn('google')} />
            </div>
        </AuthContainer>
    )
}

export default RegisterClient