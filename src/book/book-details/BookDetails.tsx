import './BookDetails.css';
export interface BookDetailsProps {
  coverImageUrl: string;
  genre: string;
  summary: string;
}

export default function BookDetails({
  coverImageUrl,
  genre,
  summary,
}: BookDetailsProps) {
  return (
    <div>
      <img src={coverImageUrl} alt="Book cover" />
      <p>Genre: {genre}</p>
      <p>Summary: {summary}</p>
    </div>
  );
}
