'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useDropzone,
  type DropzoneRootProps,
  type DropzoneInputProps,
  type FileRejection,
  type DropEvent,
} from 'react-dropzone';
import DragDropImageIcon from '~/commons/icons/DragDropImageIcon';
import RemoveIcon from '~/commons/icons/RemoveIcon';
import { dmSans } from '~/font';

// Interface to extend Blob type
interface ExtendedFile extends File {
  preview: string;
}

type Props = {
  isMultiple?: boolean;
  getFiles: (files: File[]) => void;
  defaultValue?: string | null;
};

const UploadIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
);

const AlterIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
    />
  </svg>
);

const DragAndDrop = (props: Props) => {
  const { isMultiple = false, defaultValue = '' } = props;
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const {
    getRootProps,
    getInputProps,
  }: {
    getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: isMultiple,
    onDragEnter: (event: React.DragEvent<HTMLElement>) => {
      console.log('e', event);
    },
    onError: (err: Error) => {
      console.log('error', err);
    },
    onDropRejected: (fileRejections: FileRejection[], event: DropEvent) => {
      console.log('fileRejected', fileRejections, event);
    },
    onDrop: useCallback<(_: File[]) => void>(acceptedFiles => {
      props.getFiles(acceptedFiles);
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      if (!isMultiple) {
        setFiles(files);
      } else {
        setFiles(prevFiles => [...prevFiles, ...files]);
      }
    }, []),
  });

  const renderSingleFile = (preview: string) => {
    return (
      <div className="flex min-w-0 overflow-hidden w-full h-full relative">
        <div className="absolute w-full h-full top-0 flex-col justify-center gap-5 flex opacity-0 transition-opacity duration-300 hover:opacity-100 hover:bg-stone-600/50 rounded-xl">
          <button
            {...getRootProps({ className: 'dropzone' })}
            className="bg-white w-32 mx-auto rounded-xl text-sm py-3 flex items-center justify-center"
          >
            <input {...getInputProps()} />
            <span className="flex gap-1 items-center">
              <AlterIcon /> Replace
            </span>
          </button>
          <button
            onClick={() => setFiles([])}
            className="bg-cyanBlue w-32 mx-auto rounded-xl text-sm py-3 text-red-1 flex items-center justify-center"
          >
            <span className="flex gap-1 items-center">
              <RemoveIcon strokeWidth={2} classNames="w-4 h-4" /> Remove
            </span>
          </button>
        </div>
        <Image
          src={preview}
          width={100}
          height={100}
          alt="Image"
          className="block w-full h-full rounded-xl object-cover object-top"
          onLoad={() => {
            URL.revokeObjectURL(preview);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  console.log('defaultValue', defaultValue);

  const getPreviewValue = () => {
    if (!isMultiple && files.length === 1) {
      return files[0]!.preview;
    }
    if (defaultValue) return defaultValue;
  };
  const preview = getPreviewValue();

  return (
    <section
      className={`container w-full h-full bg-stone-300/50 rounded-xl flex items-center justify-center box-border ${
        (files.length && !isMultiple) || defaultValue ? '' : 'p-3'
      }`}
    >
      {preview ? (
        renderSingleFile(preview)
      ) : (
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="flex flex-col justify-center items-center min-w-72 w-full h-full cursor-pointer border-2 border-dashed border-content-light/50 rounded-xl"
        >
          <input {...getInputProps()} />
          <DragDropImageIcon />
          <p
            className={`flex gap-1 items-center mt-8 text-lg max-xl:text-base max-sm:text-sm font-medium ${dmSans.className}`}
          >
            <span className="text-blue-600">
              <UploadIcon />
            </span>{' '}
            <span>Drag and drop an image or</span>
            <span className="text-blue-600">browse</span>
          </p>
          <span className="text-xs max-sm:text-[10px] mt-3">
            File must be JPEG, JPG or PNG and up to 10MB
          </span>
        </div>
      )}
    </section>
  );
};

export default DragAndDrop;
