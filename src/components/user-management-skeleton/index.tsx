/** @format */

const UserManagementSkeleton = () => {
  return (
    <div className="space-y-6 bg-white">
      {/* Search skeleton */}
      {/* <div className="h-10 w-full animate-pulse rounded-md bg-muted" /> */}

      {/* Table skeleton */}
      {/* <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-muted" />
            ))}
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-border p-4 last:border-b-0">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 animate-pulse rounded bg-muted" />
              ))}
            </div>
          </div>
        ))}
      </div> */}

      {/* Pagination skeleton */}
      {/* <div className="flex justify-between">
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-8 w-8 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default UserManagementSkeleton;
