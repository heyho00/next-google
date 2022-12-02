import Image from "next/image"
import { useRouter } from "next/router"
import { useRef } from "react"
import { MicrophoneIcon, SearchIcon, XIcon } from "@heroicons/react/solid"
import User from "./User"
import SearchHeaderOptions from "./SearchHeaderOptions"

function SearchHeader() {
  const router = useRouter()
  const searchInputRef = useRef(null)

  function search(event) {
    event.preventDefault()
    const term = searchInputRef.current.value
    if (!term.trim()) return
    router.push(`/search?term=${term.trim()}&searchType=`)
  }

  return (
    <header className={"styicky top-0 bg-white"}>
      <div className={"flex w-full p-6 items-center"}>
        <Image
          onClick={() => router.push("/")}
          src="https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw"
          width={"120"}
          height={"40"}
          className="w-60 cursor-pointer"
          alt="google-logo"
        />
        <form
          className={
            "flex border border-gray-200 rounded-full shadow-lg px-6 py-3 ml-10 mr-5 flex-grow max-w-3xl"
          }
        >
          <input
            type={"text"}
            defaultValue={router.query.term}
            ref={searchInputRef}
            className={"w-full focus:outline-none"}
          />
          <XIcon
            onClick={() => (searchInputRef.current.value = "")}
            className={"h-7 text-gray-500 cursor-pointer sm:mr-3"}
          />
          <MicrophoneIcon
            className={
              "h-6 hidden sm:inline-flex text-blue-500 pl-4 border-l-2 border-gray-300 mr-3"
            }
          />
          <SearchIcon className={"h-6 hidden sm:inline-flex text-blue-500"} />
          <button onClick={search} type="submit" hidden></button>
        </form>
        <User className={"ml-auto whitespace-nowrap"} />
      </div>

      <SearchHeaderOptions />
    </header>
  )
}

export default SearchHeader