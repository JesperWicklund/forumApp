import React from "react";

export default function CommentOnComment() {
  return (
    <div className="ml-4 mt-4">
      <textarea
        
        onChange={(e) => (e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-black bg-white "
        placeholder="Add a comment..."
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-400 text-white  px-4 rounded hover:opacity-65"
      >
        Submit
      </button>
    </div>
  );
}
