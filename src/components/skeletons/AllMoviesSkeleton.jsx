export default function AllMoviesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className=" pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="relative flex group transition-transform duration-300"
            >
              {/* Versión Mobile (< lg) */}
              <div className="lg:hidden flex w-full">
                <div className="w-1/2 relative">
                  <div className="w-full aspect-[16/9] bg-gray-700 rounded-sm" />
                </div>
                <div className="w-1/2 flex flex-col justify-between p-2 bg-bg-secondary">
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-700 rounded-sm" />
                    <div className="h-4 w-3/4 bg-gray-700 rounded-sm" />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="h-3 w-12 bg-gray-700 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Versión Desktop (lg+) */}
              <div className="hidden lg:block w-full">
                <div className="relative w-full overflow-hidden">
                  <div className="w-full aspect-[16/9] bg-gray-700 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
