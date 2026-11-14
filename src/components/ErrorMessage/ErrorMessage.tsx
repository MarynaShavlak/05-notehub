import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong while loading notes. Please try again later.',
}: ErrorMessageProps) {
  return (
    <p className={css.text} role="alert">
      {message}
    </p>
  );
}
