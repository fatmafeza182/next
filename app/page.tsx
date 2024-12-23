import Image from "next/image";
import Category from "./components/Home/Category";
import Banner from "./components/Home/Banner";
import Products from "./components/Home/Products"

export default function Home() {
  return (
    <div>
      <Category />
      <Banner />
      <Products />
    </div>
  )
}
