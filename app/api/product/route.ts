import { getCurrentUser } from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    if (!currentUser || currentUser.role !== 'ADMİN') {
        return NextResponse.error();
    }

    const body = await request.json();
    console.log(body);
    const { name, description, brand, category, price, inStock, image } = body;

    const user = await prisma.user.create({
        data: {
            name,
            description,
            brand,
            category,
            price,
            inStock,
            image

        }
    })
    return NextResponse.json(user)
}