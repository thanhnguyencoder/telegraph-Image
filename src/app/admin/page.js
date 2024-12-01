'use client'
import { signOut } from "next-auth/react"
import Table from "@/components/Table"
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link'
// import { toast } from "react-toastify";




export default function Admin() {
  const [listData, setListData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTotal, setSearchTotal] = useState(0); // 初始化为0，因为初始时还没有搜索结果
  const [inputPage, setInputPage] = useState(1);
  const [view, setView] = useState('list'); // 'list' 或 'log'，默认为 'list'
  const [searchQuery, setSearchQuery] = useState('');



  const getListdata = useCallback(async (page) => {
    try {
      const res = await fetch(`/api/admin/${view}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          page: (page - 1),
          query: searchQuery, // 传递搜索查询
        })
      })
      const res_data = await res.json()
      if (!res_data?.success) {
        toast.error(res_data.message)
      } else {
        setListData(res_data.data)
        const totalPages = Math.ceil(res_data.total / 10);
        setSearchTotal(totalPages);
      }

    } catch (error) {
      toast.error(error.message)
    }

  })


  useEffect(() => {
    getListdata(currentPage)
  }, [currentPage, view]);

  // 分页控制按钮
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > searchTotal) { // 检查下一页是否在总页数范围内
      toast.error('Đây là trang cuối cùng！')
    }
    if (nextPage <= searchTotal) { // 检查下一页是否在总页数范围内
      setCurrentPage(nextPage);
      setInputPage(nextPage)
    }

  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) { // 检查上一页是否在总页数范围内
      setCurrentPage(prevPage);
      setInputPage(prevPage)
      // searchVideo(prevPage);
    }

  };


  const handleJumpPage = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page >= 1 && page <= searchTotal) {
      setCurrentPage(page);
    } else {
      toast.error('Vui lòng nhập số trang hợp lệ！');
    }
    // setInputPage(""); // 清空输入框
  };

  const handleViewToggle = () => {
    setView(view === 'list' ? 'log' : 'list');
    setCurrentPage(1); // 切换视图时重置到第一页
    setInputPage(1);
  };


  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setInputPage(1);
    getListdata(1);
  };

  return (
    <>
      <div className="overflow-auto h-full flex w-full min-h-screen flex-col items-center justify-between">
        <header className="fixed top-0 h-[50px]  left-0 w-full border-b bg-white flex z-50 justify-center items-center">
          <div className="flex justify-between items-center w-full max-w-4xl px-4">
            <button className='text-white px-4 py-2  transition ease-in-out delay-150 bg-blue-500 hover:scale-110 hover:bg-indigo-500 duration-300  rounded '
              onClick={handleViewToggle}>
              Chuyển sang {view === 'list' ? 'Trang nhật ký' : 'Trang dữ liệu'}
            </button>
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded p-2 w-40 mr-2"
                placeholder="Tìm kiếm"
              />
              <button type="submit" className="text-white px-4 py-2 transition ease-in-out delay-150 bg-blue-500 hover:scale-110 hover:bg-indigo-500 duration-300 rounded">
                Tìm kiếm
              </button>
            </form>
          </div>
          <Link href="/"  className="hidden sm:flex"> <button className="px-4 py-2 mx-2 w-28  sm:w-28 md:w-20 lg:w-16 xl:w-16  2xl:w-20 bg-blue-500 text-white rounded ">Trang chủ</button></Link>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 mx-2 w-28  sm:w-28 md:w-20 lg:w-16 xl:w-16  2xl:w-20 bg-blue-500 text-white rounded ">Đăng xuất</button>
        </header>

        <main className="my-[60px] w-9/10  sm:w-9/10 md:w-9/10 lg:w-9/10 xl:w-3/5 2xl:w-full">

          <Table data={listData} />

        </main>
        <div className="fixed inset-x-0 bottom-0 h-[50px]  w-full  flex  z-50 justify-center items-center bg-white ">
          <div className="pagination mt-5 mb-5 flex justify-center items-center">
            <button className=' text-xs sm:text-sm transition ease-in-out delay-150 bg-blue-500  hover:scale-110 hover:bg-indigo-500 duration-300p-2 p-2 rounded mr-5' onClick={handlePrevPage} disabled={currentPage === 1}>
              Trang trước
            </button>
            <span className="text-xs sm:text-sm">trang {`${currentPage}/${searchTotal}`}</span>
            <button className='text-xs sm:text-sm transition ease-in-out delay-150 bg-blue-500  hover:scale-110 hover:bg-indigo-500 duration-300 p-2 rounded ml-5' onClick={handleNextPage}>
              Trang tiếp theo</button>
            <div className="ml-5 flex items-center">
              <input
                type="number"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                className="border rounded p-2 w-20"
                placeholder="số trang"
              />
              <button className='text-xs sm:text-sm transition ease-in-out delay-150 bg-blue-500 hover:scale-110 hover:bg-indigo-500 duration-300 p-2 rounded ml-2' onClick={handleJumpPage}>
                Đi đến
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>

  )
}
