"use client";
import { useState } from "react";
import axios from "axios";

const GeminiEmailGenerator = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(process.env.NEXT_PUBLIC_EMAIL_API)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_EMAIL_API, {
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Email Generator (Gemini)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter reason for leave..."
          className="w-full border border-gray-300 rounded p-2"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>
      </form>

      {response && (
        <div className="mt-6 bg-gray-100 text-black p-4 rounded whitespace-pre-line">
          <h2 className="font-semibold mb-2">Generated Email:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiEmailGenerator