import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const data: any = {};
        let resumeUrl: string | null = null;

        // Process FormData
        for (const [key, value] of formData.entries()) {
            if (key === "resume" && value instanceof File) {
                // Handle file upload
                const fileName = `${uuidv4()}-${value.name}`;
                const filePath = path.join(process.cwd(), "public/uploads", fileName);
                fs.writeFileSync(filePath, Buffer.from(await value.arrayBuffer()));
                resumeUrl = `${fileName}`;
            } else {
                data[key] = value;
            }
        }

        // Ensure only the resumeUrl is saved
        if (resumeUrl) {
            data.resumeUrl = resumeUrl;
        }
        // Remove the resume field to avoid sending an invalid object
        delete data.resume;

        // Convert age to integer
        if (data.age) {
            data.age = parseInt(data.age, 10);
        }

        // Save to the database using Prisma
        const savedData = await prisma.candidate.create({
            data,
        });

        return NextResponse.json({ message: "Form submitted successfully!", savedData });
    } catch (error) {
        console.error("Error handling form submission:", error);
        return NextResponse.json({ error: "Failed to handle form submission." }, { status: 500 });
    }
}
