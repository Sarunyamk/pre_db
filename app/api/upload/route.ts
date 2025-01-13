import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded or invalid file type" }, { status: 400 });
    }

    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const uploadedUrl = `/uploads/${fileName}`;
    return NextResponse.json({ url: uploadedUrl });
}
