import { useMemo, useState } from "react";

export default function useSearch(data, initialSearchTerm = "") {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

    const filterData = useMemo(() => {
        if (!searchTerm) return data

        const lowerCaseSearchTerm = searchTerm?.trim().toLowerCase() || ""

        return data.filter(item => {
            const fieldsToSearch = [
                item.name,
                item.maincategory?.name,
                item.subcategory?.name,
                item.brand?.name,
                item.color,
                item.size,
                item.description
            ]

            return fieldsToSearch.some(field => typeof field === 'string' && field.toLowerCase().includes(lowerCaseSearchTerm))
        })
    }, [data, searchTerm])

    const onChange = (e) => setSearchTerm(e?.target?.value ?? "")

    return {
        searchTerm,
        setSearchTerm,
        filterData,
        onChange
    }
}