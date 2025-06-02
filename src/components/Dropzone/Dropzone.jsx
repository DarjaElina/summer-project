import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';
import clsx from 'clsx';

function Dropzone({ onFileSelect }) {
  const [file, setFile] = useState(null);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg'],
      'image/bmp': ['.bmp']
    },
    multiple: false,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const selected = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        });
        setFile(selected);
        if (onFileSelect) onFileSelect(selected);
      }
    }
  });

  const dropzoneClass = clsx(
    styles.dropzone,
    isFocused && styles.focused,
    isDragAccept && styles.accept,
    isDragReject && styles.reject
  );

  const removeFile = () => {
    if (file) URL.revokeObjectURL(file.preview);
    setFile(null);
    if (onFileSelect) onFileSelect(null);
  };

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <div className="container">
      <div {...getRootProps({ className: dropzoneClass })}>
        <input {...getInputProps()} />
        {!file ? (
          <p>Drag 'n' drop an image here, or click to select one</p>
        ) : (
          <div className={styles.previewContainer}>
            <div className={styles.thumb}>
              <div className={styles.thumbInner}>
                <img
                  src={file.preview}
                  alt={file.name}
                  className={styles.img}
                  onLoad={() => URL.revokeObjectURL(file.preview)}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
