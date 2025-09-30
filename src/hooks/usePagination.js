import { useMemo, useState } from "react";


export default function usePagination(data = [], itemPerPage = 6) {
    const [currentPage, setCurrentPage] = useState(0)

    const pageCount = Math.ceil((data.length || 0) / itemPerPage)

    const currentItems = useMemo(() => {
        const startIndex = currentPage * itemPerPage
        const endIndex = startIndex + itemPerPage
        return data.slice(startIndex, endIndex)
    }, [data, currentPage, itemPerPage])

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected)
    }

    // Calculate start and end index correctly for external use
    const startIndex = useMemo(() => currentPage * itemPerPage, [currentPage, itemPerPage]);
    const endIndex = useMemo(() => Math.min(startIndex + itemPerPage, data.length), [startIndex, itemPerPage, data.length]);

    const resetPage = () => setCurrentPage(0)

    return {
        currentPage,
        setCurrentPage,
        pageCount,
        currentItems,
        handlePageChange,
        resetPage,
        startIndex,
        endIndex,
        totalItems: data.length,
    }
}