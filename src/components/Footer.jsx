import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="w-full  h-1/12 text-center  bg-slate-200  flex flex-col justify-center items-center">
      <div >
        <p className="text-xs text-gray-500">Copyright Ⓒ 2024 All rights reserved. Vui lòng không tải lên những hình ảnh vi phạm luật pháp. Người vi phạm sẽ phải chịu hậu quả.。 Chương trình này dựa trên Cloudflare Pages，mã nguồn mở
          <Link 
          href="https://github.com/x-dr/telegraph-Image"
          className="text-blue-300  hover:text-red-900 ml-1"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub Telegraph-Image</Link> </p>
      </div>
    </footer>
  );
}
