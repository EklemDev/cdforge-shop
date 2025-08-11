import Header from "@/components/header"
import Footer from "@/components/footer"
import MainCategorySelection from "@/components/main-category-selection"
import CallToAction from "@/components/call-to-action"

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-24">
        <MainCategorySelection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
