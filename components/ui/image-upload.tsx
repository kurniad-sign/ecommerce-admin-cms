'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  width?: number;
  height?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
  height,
  width,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result?.info?.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden mb-4"
            style={{
              width,
              height,
            }}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="uteajvsz">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
