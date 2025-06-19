import FileUploader from "@/components/FileUploader";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Upload CSV File
        </h1>
        <p className="text-gray-600 text-sm text-center mb-8">
          Upload a sales CSV to generate and download a processed file.
        </p>
        <FileUploader />
      </div>
    </main>
  );
}
