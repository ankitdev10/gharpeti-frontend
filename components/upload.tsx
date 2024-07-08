"use client";

import { useState } from "react";

import { Paperclip } from "lucide-react";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-uploader";

const FileSvgDraw = () => (
  <>
    <svg
      className="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
      />
    </svg>
    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
      <span className="font-semibold">Click to upload</span>
      &nbsp; or drag and drop
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      SVG, PNG, JPG or GIF
    </p>
  </>
);

interface UploaderProps {
  fn: (e: File[]) => void;
  multiple?: boolean;
  max?: number;
}

export const Uploader = ({ fn, multiple = true, max = 5 }: UploaderProps) => {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: max,
    maxSize: 1024 * 1024 * 4,
    multiple,
  };

  const handleFileChange = (e: File[] | null) => {
    if (e) {
      setFiles(e);
      fn(e);
    }
  };
  return (
    <FileUploader
      value={files}
      onValueChange={(e) => handleFileChange(e)}
      dropzoneOptions={dropZoneConfig}
      className="relative rounded-lg bg-background p-2"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex w-full flex-col items-center justify-center pb-4 pt-3 ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem
              /* eslint-disable */
              key={i}
              index={i}
            >
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};
