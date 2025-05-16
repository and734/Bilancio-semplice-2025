"use client";

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, AlertTriangle } from 'lucide-react'; // Changed to AlertTriangle for errors
import { Label } from '@/components/ui/label';

interface FileUploadFormProps {
  onSubmit: (file: File) => void;
  disabled?: boolean;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onSubmit, disabled }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validExtensions = ['.pdf', '.xls', '.xlsx', '.xml'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        setError('Tipo di file non supportato. Si prega di caricare PDF, XLS, XLSX, o XML.');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the input
        }
        return;
      }
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null); // Reset if no file is chosen
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile);
    } else {
      setError('Seleziona un file da caricare.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="file-upload" className="block text-sm font-medium text-foreground mb-1">
          Seleziona File Bilancio
        </Label>
        <Input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus-visible:ring-accent"
          accept=".pdf,.xls,.xlsx,.xml"
          disabled={disabled}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Formati supportati: PDF, XLS, XLSX, XML. Max 10MB.
        </p>
      </div>

      {error && (
        <div className="flex items-center p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md shadow-sm">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="flex-grow">{error}</span>
        </div>
      )}

      <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!selectedFile || disabled}>
        <UploadCloud className="mr-2 h-5 w-5" />
        Analizza File
      </Button>
    </form>
  );
};

export default FileUploadForm;
