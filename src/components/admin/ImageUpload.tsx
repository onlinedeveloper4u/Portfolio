import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
}

// Helper function to extract storage path from Supabase public URL
const getStoragePathFromUrl = (url: string): string | null => {
  if (!url) return null;

  // Match pattern: /storage/v1/object/public/portfolio-assets/path/to/file
  const storageMatch = url.match(/\/storage\/v1\/object\/public\/portfolio-assets\/(.+)/);
  if (storageMatch) return storageMatch[1];

  // Also handle direct paths stored in DB
  if (url.startsWith('/')) return url.slice(1);

  return null;
};

// Helper function to delete image from Supabase storage
const deleteImageFromStorage = async (url: string): Promise<void> => {
  const path = getStoragePathFromUrl(url);
  if (!path) return;

  try {
    await supabase.storage.from('portfolio-assets').remove([path]);
  } catch (error) {
    console.error('Failed to delete image from storage:', error);
  }
};

const ImageUpload = ({
  value,
  onChange,
  folder = 'uploads',
  label = 'Image',
  className,
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      // Delete old image if exists
      if (value) {
        await deleteImageFromStorage(value);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(fileName);

      onChange(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    // Delete image from storage
    if (value) {
      await deleteImageFromStorage(value);
    }

    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative group">
            <img
              src={value}
              alt="Uploaded"
              className="w-20 h-20 rounded-lg object-cover border border-border"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            Max size: 5MB. Supported: JPG, PNG, GIF, WebP
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the delete function for use in other components
export { deleteImageFromStorage };
export default ImageUpload;

