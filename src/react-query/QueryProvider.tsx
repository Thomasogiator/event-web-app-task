import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react"

interface QueryProps {
    children: React.ReactNode;
}

const QueryProvider =({children}: QueryProps) =>{
    const [queryClient] = useState(()=> new QueryClient())

    return(
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default QueryProvider