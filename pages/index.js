import Head from "next/head"
import Header from "../components/Header"
import Image from "next/image"
import { MicrophoneIcon, SearchIcon } from "@heroicons/react/solid"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import { useRef } from "react"

export default function Home() {
  const router = useRouter()
  const searchInputRef = useRef(null)

  function search(event) {
    event.preventDefault()
    const term = searchInputRef.current.value
    if (!term.trim()) return
    router.push(`/search?term=${term.trim()}&searchType=`)
  }

  async function randomSearch(event) {
    event.preventDefault()
    const randomTerm = await fetch("https://random-words-api.vercel.app/word/")
      .then((response) => {
        return response.json()
      })
      .then(function (res) {
        return res[0].word
      })
    if (!randomTerm) return
    router.push(`/search?term=${randomTerm}&searchType=`)
  }

  return (
    <div>
      <Head>
        <title>hoohle</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <form className={"flex flex-col items-center mt-32"}>
        <Image
          src="https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw"
          width={"300"}
          height={"100"}
          className="w-60 object-cover "
          alt="google-logo"
        />
        <div
          className={
            "flex w-full mt-5 mx-auto max-w-[90%] border border-gary-200 hover:shadow-lg sm:max-w-xl focus-within:shadow-lg px-5 py-3 rounded-full items-center"
          }
        >
          <SearchIcon className={"h-5 text-gray-500 mr-3"} />
          <input
            ref={searchInputRef}
            type={"text"}
            className={"flex-grow focus:outline-none"}
          />
          <MicrophoneIcon className={"h-5"} />
        </div>
        <div
          className={
            "flex flex-col sm:flex-row w-[50%] space-y-2 mt-8 sm:space-y-0 sm:space-x-4 justify-center"
          }
        >
          <button onClick={search} className={"btn"}>
            Google Search
          </button>
          <button onClick={randomSearch} className={"btn"}>
            Random search !
          </button>
        </div>
      </form>

      <Footer />
    </div>
  )
}
