export function ShimmerCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 bg-gray-200 rounded-full w-32"></div>
            <div className="h-4 bg-gray-200 rounded-full w-16"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full w-48 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded-full w-24"></div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="h-7 bg-gray-200 rounded-lg w-24"></div>
          <div className="h-7 bg-gray-200 rounded-lg w-7"></div>
          <div className="h-7 bg-gray-200 rounded-lg w-7"></div>
        </div>
      </div>
    </div>
  )
}

export function ShimmerStat() {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 text-center animate-pulse">
      <div className="h-8 bg-gray-200 rounded-full w-12 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-200 rounded-full w-16 mx-auto"></div>
    </div>
  )
}

export function ShimmerForm() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="h-3 bg-gray-200 rounded-full w-20 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="h-3 bg-gray-200 rounded-full w-16 mb-2"></div>
        <div className="h-24 bg-gray-200 rounded-xl w-full"></div>
      </div>
    </div>
  )
}

export function ShimmerDashboardList() {
  return (
    <div className="animate-pulse divide-y divide-gray-50">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="px-6 py-4 flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded-full w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-24"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
      ))}
    </div>
  )
}