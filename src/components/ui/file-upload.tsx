import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value?: FileList | null;
  onChange: (files: FileList | null) => void;
  existingImage?: string;
};

const FileUpload = ({ value, onChange, existingImage }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cleared) {
      setPreview(null);
      return;
    }

    if (value && value.length > 0) {
      const file = value[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (existingImage) {
      setPreview(existingImage);
    } else {
      setPreview(null);
    }
  }, [value, existingImage, cleared]);

  const handleClear = () => {
    setCleared(true);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // input'u sıfırlar
    }
    onChange(null);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Button type="button" onClick={handleButtonClick} variant="default">
         {value || preview ? "Dosya değiştir" : "Dosya seç"}
      </Button>

      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          setCleared(false);
          onChange(e.target.files);
        }}
        className="hidden"
      />

      {preview && (
        <div className="relative w-32 h-32 border rounded overflow-hidden">
          <img src={preview} alt="Önizleme" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
