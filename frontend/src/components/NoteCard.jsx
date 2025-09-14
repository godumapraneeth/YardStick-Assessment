export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="text-gray-600 flex-1">{note.content}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
