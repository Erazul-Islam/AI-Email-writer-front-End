"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const GeminiImageGenerator = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_IMAGE_API, {
        message,
      });
      setResponse(res.data.data);
    } catch (err) {
      console.error("Error:", err);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  console.log(response)

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Image Generator (Gemini)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="ex: can you create a 3d rendered image of a pig"
          className="w-full border border-gray-300 rounded p-2"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

        <div>
            <h1 className="mt-4" >{response?.textResponse}</h1>
            {
                response && <Image className="mt-4" src={`data:image/png;base64,${response?.base64Image}`} width={400} height={400} alt="" />
            }
        </div>
      
    </div>
  );
};

export default GeminiImageGenerator