import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <div>
      <img src={coverImageUrl} alt="Book cover" />
      <p>{t('genre')}: {genre}</p>
      <p>{t('summary')}: {summary}</p>
    </div>
  );
}
