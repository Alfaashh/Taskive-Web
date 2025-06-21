import Navigation from "./navigation"
import Footer from "./footer"

const collections = [
  { id: 1, name: "Penguin", status: "Healthy", image: "🐧" },
  { id: 2, name: "Penguin", status: "Healthy", image: "🐧" },
  { id: 3, name: "Penguin", status: "Healthy", image: "🐧" },
]

function ProfilePage({ currentPage, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={currentPage} onTabChange={setCurrentPage} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>

        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-2xl font-bold">
            ZM
          </div>
          <h2 className="text-2xl font-bold mb-4">Zayn Javadd Malik</h2>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors">
            Edit your profile
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-2xl mb-8 shadow-lg">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">100</div>
                <div className="text-purple-200">Coins</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">#1</div>
                <div className="text-purple-200">Level</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
            <div className="flex-1 mx-4">
              <div className="h-3 bg-white/20 rounded-full">
                <div className="h-3 bg-white rounded-full" style={{ width: "83%" }}></div>
              </div>
            </div>
            <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
          </div>
          <div className="text-center mt-2 text-purple-200">500/600</div>
        </div>

        {/* Collections */}
        <div>
          <h3 className="text-xl font-bold mb-6">Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((item) => (
              <div key={item.id} className="bg-white p-6 text-center border rounded-xl shadow-lg">
                <div className="text-6xl mb-4">{item.image}</div>
                <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProfilePage
