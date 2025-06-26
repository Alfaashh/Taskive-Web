export function ProfileStats() {
  return (
    <div className="gradient-primary rounded-2xl p-6 text-white mb-8 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-2xl">$</span>
          </div>
          <div>
            <div className="text-2xl font-bold">100</div>
            <div className="text-sm opacity-80">Coins</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <div className="text-2xl font-bold">#1</div>
            <div className="text-sm opacity-80">Level</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl font-bold">1</span>
          </div>
          <div className="flex-1 bg-white/20 rounded-full h-3 min-w-[200px] backdrop-blur-sm">
            <div className="bg-white h-full rounded-full shadow-sm" style={{ width: "83%" }}></div>
          </div>
          <span className="text-sm">500/600</span>
        </div>
        <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center ml-4 backdrop-blur-sm">
          <span className="text-xl font-bold">2</span>
        </div>
      </div>
    </div>
  )
}
