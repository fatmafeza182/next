import bcrypt from "bcrypt";
import prisma from '@/libs/prismadb';
import { NextResponse } from "next/server";

// Yardımcı fonksiyon: Email formatını doğrulamak için
const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
};

// Yardımcı fonksiyon: Şifre uzunluğunu kontrol etmek için
const validatePassword = (password: string) => {
    return password.length >= 8; // Şifrenin en az 8 karakter olması gerektiğini kontrol ediyoruz
}

export async function POST(request: Request) {
    try {
        // Gelen istek gövdesini JSON formatında alıyoruz
        const body = await request.json();
        const { name, email, password } = body;

        // Gereken alanların kontrolü
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Tüm alanlar gereklidir" }, { status: 400 });
        }

        // Email formatını doğrulama
        if (!validateEmail(email)) {
            return NextResponse.json({ message: "Geçersiz email formatı" }, { status: 400 });
        }

        // Şifre doğrulama (en az 8 karakter)
        if (!validatePassword(password)) {
            return NextResponse.json({ message: "Şifre en az 8 karakter olmalıdır" }, { status: 400 });
        }

        // Veritabanında bu email ile bir kullanıcı olup olmadığını kontrol ediyoruz
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ message: "Bu email ile zaten bir kullanıcı mevcut" }, { status: 400 });
        }

        // Şifreyi hashliyoruz
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcıyı veritabanına ekliyoruz
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });

        // Şifreyi geri döndürmüyoruz, sadece kullanıcı bilgilerini döndürüyoruz
        const { hashedPassword: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            status: "success",
            message: "Kullanıcı başarıyla oluşturuldu",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Kullanıcı kaydı sırasında hata oluştu:", error);
        return NextResponse.json({ message: "Sunucu hatası, lütfen tekrar deneyin" }, { status: 500 });
    }
}
