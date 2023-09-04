"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { Button } from "./ui/button";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="relative w-20 h-20">
                <Image fill src={value} alt="Upload" className="rounded-full" />
                {/* <Button className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500" onClick={() => onChange("")}>
                    <X className="w-4 h-4 border border-black" />
                    
                </Button> */}
                <div className="absolute top-0 right-0 flex items-end justify-center p-1 text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-400" onClick={() => onChange("")}>
                    <X className="w-4 h-4" />
                </div>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log("🚀 ~ file: file-upload.tsx:21 ~ FileUpload ~ error:", error)
            }}
        />
    )
}