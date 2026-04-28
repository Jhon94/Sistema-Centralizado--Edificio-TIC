export default function Header({ titulo }) {
  const ahora = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <h1>{titulo}</h1>
      <span className="header-date">{ahora}</span>
    </header>
  );
}
