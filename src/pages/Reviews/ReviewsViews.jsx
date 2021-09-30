import {fetchMovieReviews} from '../../Api/Api';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function ReviewsViews() {
  const [status, setStatus] = useState('idle');
  const {movieId} = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (movieId) {
      setStatus('pending');
      (async () => {
        try {
          const fetch = await fetchMovieReviews(movieId);
          setReviews(fetch);
          fetch.length === 0 ? setStatus('rejected') : setStatus('resolved');
        } catch {
          setStatus('rejected');
        }
      })();
    }
  }, [movieId]);

  return (
    <section>
      {status === 'pending' && <Loader></Loader>}
      {status === 'resolved' &&
        reviews.map(({author, author_details, content, id}) => (
          <article key={id}>
            <h2>Author: {author}</h2>
            <p>{content}</p>
          </article>
        ))}
      {status === 'rejected' && <p>We don't have any reviews for this movie</p>}
    </section>
  );
}
