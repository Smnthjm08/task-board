import { getBoards } from '@/actions/board/get-board';
import { db } from '@/lib/db';


export default async function BoardsList({ organizationId }: { organizationId: string }) {
  const boards = await getBoards(organizationId);
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Boards</h2>
      {boards.length === 0 ? (
        <p className="text-gray-500">No boards yet. Create your first one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div key={board.id} className="p-4 border rounded-md">
              <h3 className="font-medium">{board.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}