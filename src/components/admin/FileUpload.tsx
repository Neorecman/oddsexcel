import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert('Dosya boyutu 10MB\'dan büyük olamaz!');
        return;
      }
      
      // Dosya yükleme simülasyonu
      setTimeout(() => {
        console.log('File uploaded:', file.name);
      }, 1000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Dosya Yükleme</h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        {isDragActive ? (
          <p className="text-blue-600">Dosyayı buraya bırakın...</p>
        ) : (
          <div>
            <p className="text-gray-600">Excel dosyalarını sürükleyip bırakın</p>
            <p className="text-sm text-gray-500 mt-2">veya dosya seçmek için tıklayın</p>
            <p className="text-xs text-gray-400 mt-2">Maksimum dosya boyutu: 10MB</p>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <UploadStatus
          filename="rapor-2024.xlsx"
          status="completed"
          message="Başarıyla yüklendi"
        />
        <UploadStatus
          filename="veriler.csv"
          status="failed"
          message="Geçersiz dosya formatı"
        />
      </div>
    </div>
  );
};

interface UploadStatusProps {
  filename: string;
  status: 'completed' | 'failed';
  message: string;
}

const UploadStatus: React.FC<UploadStatusProps> = ({ filename, status, message }) => {
  return (
    <div className="flex items-center space-x-2 p-2 rounded bg-gray-50">
      {status === 'completed' ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-500" />
      )}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{filename}</p>
        <p className={`text-xs ${status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;