import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get("content-type");
        let data;

        if (contentType?.includes("application/json")) {
            // Parse JSON body
            data = await req.json();
        } else if (contentType?.includes("multipart/form-data")) {
            // Parse FormData
            const formData = await req.formData();
            data = Object.fromEntries(formData.entries()); // Convert FormData to an object
        } else {
            return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 400 });
        }

        // Convert age to integer if present
        if (data.age) {
            data.age = parseInt(data.age as string, 10);
        }

        console.log("Parsed Data:", data);

        // Create candidate in Prisma
        const form = await prisma.candidate.create({
            data,
        });

        return NextResponse.json({ message: "Form submitted successfully!", form });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

