
'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  cancel: string;
  confirm: string;
};

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  description,
  cancel,
  confirm
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-w-sm w-full bg-white rounded-xl p-6 shadow-lg transform -translate-x-1/2 -translate-y-1/2 space-y-4 border-2 border-red-600">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-sm text-gray-600">
            {description}
          </Dialog.Description>
          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                {cancel}
              </button>
            </Dialog.Close>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                onConfirm();
                onCancel();
                onOpenChange(false);
              }}
            >
              {confirm}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
