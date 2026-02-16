'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import type { QuestionnaireData, PosterThemeId } from '@/types';
import { POSTER_TEMPLATES } from '@/lib/data/poster-templates';
import { uploadUrl } from '@/lib/api-config';

interface ThemeStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function ThemeStep({ formData, updateFormData }: ThemeStepProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const selectedTheme = formData.posterTheme;
  const userImageUrl = formData.userImageUrl;

  const handleSelectTheme = (id: PosterThemeId) => {
    updateFormData({ posterTheme: id });
    setUploadError(null);
  };

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        setUploadError('Please upload an image (JPEG, PNG, or WebP)');
        return;
      }
      setUploading(true);
      setUploadError(null);
      try {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        const res = await fetch(uploadUrl(), {
          method: 'POST',
          body: formDataUpload,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || err.error || `Upload failed: ${res.status}`);
        }
        const { url } = await res.json();
        updateFormData({ userImageUrl: url });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [updateFormData]
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Choose Your Poster Theme
      </h2>
      <p className="text-text-secondary mb-6">
        Select a template and upload your photo. We&apos;ll create a personalized calendar with your image.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-3 text-text-primary">
          Template
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {POSTER_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleSelectTheme(t.id)}
              className={`relative rounded-design-lg overflow-hidden border-2 transition-all text-left ${
                selectedTheme === t.id
                  ? 'border-accent-primary ring-2 ring-accent-primary/30'
                  : 'border-border-light hover:border-border-medium'
              }`}
            >
              <div className="aspect-[3/4] relative bg-canvas">
                <Image
                  src={t.imagePath}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-3 bg-white">
                <p className="font-semibold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-tertiary line-clamp-2">{t.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedTheme && (
        <div>
          <label className="block text-sm font-medium mb-2 text-text-primary">
            Upload your photo
          </label>
          <p className="text-sm text-text-secondary mb-3">
            We&apos;ll use this to personalize the calendar with your likeness.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <label className="flex-shrink-0 cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={uploading}
                className="sr-only"
              />
              <span className="inline-flex px-4 py-2 bg-accent-primary text-white rounded-design-md font-medium hover:opacity-90 disabled:opacity-50">
                {uploading ? 'Uploading...' : userImageUrl ? 'Change photo' : 'Choose photo'}
              </span>
            </label>
            {userImageUrl && (
              <div className="relative w-20 h-20 flex-shrink-0 rounded-design-md overflow-hidden border-2 border-border-light bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element -- S3 URLs fail with Next.js Image optimizer */}
                <img
                  src={userImageUrl}
                  alt="Your photo"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            )}
          </div>
          {uploadError && (
            <p className="mt-2 text-sm text-accent-coral">{uploadError}</p>
          )}
        </div>
      )}
    </div>
  );
}
