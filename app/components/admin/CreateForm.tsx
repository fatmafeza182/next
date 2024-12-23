"use client"
import { MdComputer } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdOutlineTabletMac } from "react-icons/md";
import { GiBallerinaShoes } from "react-icons/gi";
import { GiUnderwearShorts } from "react-icons/gi";
import { GiLabCoat } from "react-icons/gi";
import { GiHeartNecklace } from "react-icons/gi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../General/Heading"
import Input from "../General/Input"
import CheckBox from "../General/CheckBox"
import ChoiceInput from "../General/ChoiceInput";
import { Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/router';



const CreateForm = () => {
    const categoryList = [
        {
            name: "Bilgisayar",
            icon: MdComputer
        },
        {
            name: "Telefon",
            icon: IoMdPhonePortrait
        },
        {
            name: "Tablet",
            icon: MdOutlineTabletMac
        },
        {
            name: "Ayakkabı",
            icon: GiBallerinaShoes
        },
        {
            name: "Şort",
            icon: GiUnderwearShorts
        },
        {
            name: "Mont",
            icon: GiLabCoat
        },
        {
            name: "Kolye",
            icon: GiHeartNecklace
        },
    ];
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            price: "",
            inStock: false,
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("data", data);

        let newData = { ...data }

        axios.post('api/product', newData)
            .then(() => {
                toast.success('Ürün başarıyla eklendi!!')
                // router.replace()

            }).catch((error) => {
                console.log(error, 'error')
            })
        console.log(newData, 'newData')
    };



    const category = watch("category"); // watching category field value

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    };

    return (

        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-xl">
            <Heading text="ÜRÜN OLUŞTUR" center />
            <Input type="text" placeholder="Ad" id="name" register={register} errors={errors} required />
            <Input type="text" placeholder="Açıklama" id="description" register={register} errors={errors} required />
            <Input type="text" placeholder="Marka" id="brand" register={register} errors={errors} required />
            <Input type="number" placeholder="Fiyat" id="price" register={register} errors={errors} required />

            <CheckBox id="inStock" label="Ürün stokta mevcut mu ?" register={register} />
            <div className="flex flex-wrap gap-3">
                {categoryList.map((cat, i) => (
                    <ChoiceInput
                        key={i}
                        icon={cat.icon}
                        text={cat.name}
                        onClick={() => setCustomValue("category", cat.name)}
                        selected={category === cat.name}
                    />
                ))}

            </div>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Ürün oluştur</Button>
        </div>


    );
};

export default CreateForm;
