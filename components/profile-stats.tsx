import { useUser } from "../app/user-context";
export function ProfileStats() {
  const { user } = useUser();
  const level = user.level;
  const nextLevelExp = (level + 1) * 100;
  const currentXp = user.xp ?? 0;
  const coins = user.coins;
  const progress = Math.min(100, Math.round((currentXp / nextLevelExp) * 100));
  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 rounded-2xl p-6 text-white mb-8 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-2xl" style={{ textShadow: '0 2px 8px #7812a5' }}>$</span>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ textShadow: '0 2px 8px #7812a5' }}>{coins}</div>
            <div className="text-sm opacity-80">Coins</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-2xl" style={{ textShadow: '0 2px 8px #7812a5' }}>📊</span>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ textShadow: '0 2px 8px #7812a5' }}>#{level}</div>
            <div className="text-sm opacity-80">Level</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl font-bold" style={{ textShadow: '0 2px 8px #7812a5' }}>{level}</span>
          </div>
          <div className="flex-1 bg-white/20 rounded-full h-5 min-w-[200px] backdrop-blur-sm relative">
            <div className="bg-white h-full rounded-full shadow-sm flex items-center justify-center text-base font-bold text-white" style={{ width: `${progress}%` }}>
              <span className="w-full text-center block" style={{ position: 'absolute', left: 0, right: 0, textShadow: '0 1px 6px #7812a5' }}>
                {currentXp}/{nextLevelExp} EXP
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center ml-4 backdrop-blur-sm">
            <span className="text-xl font-bold" style={{ textShadow: '0 2px 8px #7812a5' }}>{level + 1}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
