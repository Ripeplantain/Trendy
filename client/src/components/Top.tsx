import useScrollToTop from "../custom/useScrolltoTop"

const Top = () => {
    
    const scrollTrigger: number = 300
    const {isVisible, scrollToTop} = useScrollToTop(scrollTrigger)

  return (
    <>
        {isVisible && (
                <div
                className="fixed bottom-10 right-10 bg-[#3c6382] dark:bg-[#3c6382] text-white p-3 rounded-full cursor-pointer"
                onClick={scrollToTop}
            >
              Scroll to top
            </div>
        )}
    </>

  )
}

export default Top
