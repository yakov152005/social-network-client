
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean>(() => {

        return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
    })

    React.useEffect(() => {
        if (typeof window === 'undefined') return

        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }


        checkIfMobile()


        window.addEventListener('resize', checkIfMobile)

   
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    return isMobile
}