"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("Uploading...");
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/transcode", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const jobId = data.id;
      
      setStatus(`✅ Uploaded! Job ID: ${jobId}. Processing...`);

      // Start Polling (Checking status every 2 seconds)
      startPolling(jobId);

    } catch (error) {
      console.error(error);
      setStatus("❌ Error uploading file.");
    }
  };

  const startPolling = (id: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3000/transcode/status/${id}`);
        const data = await res.json();
        console.log(data);
        if (data.status === "Completed") {
          clearInterval(interval); // Stop asking
          setStatus("🎉 Transcoding Done!");
          // Construct the download URL
          console.log(data.result);
          setDownloadUrl(`http://localhost:3000/${data.result}`);
        } else if (data.status === "Failed") {
          clearInterval(interval);
          setStatus("❌ Transcoding failed.");
        } else {
          setStatus(`⏳ Processing... (Status: ${data.status})`);
        }
      } catch (err) {
        setStatus("❌ Error checking status.");
        clearInterval(interval);
      }
    }, 2000); // Check every 2 seconds
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Transcode<span className="text-white">Me</span></h1>

        <div className="border-2 border-dashed border-gray-600 rounded-lg p-10 text-center hover:border-blue-500 transition-colors">
          <input type="file" accept="video/mp4" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-blue-600 file:text-white" />
        </div>

        <button onClick={handleUpload} disabled={!file} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 transition">
          Start Transcode Job
        </button>

        {status && <div className="mt-6 p-4 bg-gray-800 rounded text-center animate-pulse"><p>{status}</p></div>}

        {/* Show Download Button when Ready */}
        {downloadUrl && (
          <a href={downloadUrl} download className="block mt-4 w-full bg-green-600 hover:bg-green-700 text-center text-white font-bold py-3 px-4 rounded transition">
            ⬇️ Download Audio (MP3)
          </a>
        )}
      </div>
    </div>
  );
}