import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as Blob | null;
        const data = Object.fromEntries(formData);

        if (file) {
            const fileName = `${uuidv4()}-${file.name}`;
            const filePath = path.join(process.cwd(), "public/uploads", fileName);
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(filePath, buffer);
            data.resumeUrl = `/uploads/${fileName}`;
        }

        const form = await prisma.candidate.create({
            data: {
                ...data,
                age: parseInt(data.age as string, 10),
            },
        });

        return NextResponse.json({ message: "Form submitted successfully!", form });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
