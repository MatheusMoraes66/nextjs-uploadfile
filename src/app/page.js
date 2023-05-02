"use client";
import { useState } from "react";
import Image from "next/image";
export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      const form = new FormData();
      form.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-zinc-950 p-5">
        <h1 className="text-4x1 text-center my-4">Upload File</h1>

        <input
          className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
          type="file"
          onChange={handleFileChange}
        />

        <button
          disabled={!file}
          className="bg-green-900 text-zinc-100 rounded block w-full disabled:opacity-50 "
        >
          Upload
        </button>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="upload file"
            className="w-auto h-64 object-cover mt-4 text-center"
            width={100}
            height={100}
          />
        )}
      </form>
    </main>
  );
}
