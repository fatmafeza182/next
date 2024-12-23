import prisma from '@/libs/prismadb'
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";




export async function Delete(
    request: Request, { params }: { params: { id: string } }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMİN") {
        return NextResponse.error()
    }
    const product = await prisma?.product.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(product)

}