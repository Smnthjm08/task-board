export default function UsersPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div>Id: {params.id}</div>
    </div>
  );
}
