// src/components/ResourceUploader.tsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ResourceUploader({ sessionId }: { sessionId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const filename = `${Date.now()}_${file.name}`;
    const { data, error: uploadError } = await supabase
      .storage
      .from('resources')
      .upload(filename, file);
    if (uploadError) {
      console.error('Upload error', uploadError);
      setUploading(false);
      return;
    }
    await supabase.from('admin_resources').insert({
      title,
      resource_url: filename,
      created_by: null // replace with counselor id
    });
    alert('Resource uploaded');
    setTitle('');
    setFile(null);
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="file"
        onChange={e => setFile(e.target.files?.[0] ?? null)}
        className="border rounded p-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-3 py-1 bg-indigo-600 text-white rounded"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
