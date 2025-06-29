'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from './ui/button';

interface UpdateDialogProps {
  updates: string[];
}

const LAST_SEEN_UPDATE_VERSION = 'v1.0.0'; // يمكنك تغيير هذا لتحديد متى يجب أن يظهر التحديث الجديد

export function UpdateDialog({ updates }: UpdateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // const lastSeenVersion = localStorage.getItem('lastSeenUpdateVersion');

    // if (lastSeenVersion !== LAST_SEEN_UPDATE_VERSION) {
      setIsOpen(true);
      // localStorage.setItem('lastSeenUpdateVersion', LAST_SEEN_UPDATE_VERSION);
    // }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px] mx-4 bg-gray-900 border border-gray-700 shadow-2xl rounded-3xl p-6 animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-red-500">🎉 تحديثات جديدة! 🎉</DialogTitle>
          <DialogDescription className="text-center text-gray-300 mt-2">
            لا تفوت هذه الميزات الرائعة في أحدث إصدار:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            {updates.map((update, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span>{update}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={() => setIsOpen(false)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg mt-4">
          رائع! فهمت
        </Button>
      </DialogContent>
    </Dialog>
  );
} 