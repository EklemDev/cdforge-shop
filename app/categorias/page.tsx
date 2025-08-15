import Header from "@/components/header"
import Footer from "@/components/footer"
import SimpleCategoryDisplay from "@/components/simple-category-display"

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <SimpleCategoryDisplay />
      </main>
      <Footer />
    </div>
  )
}
