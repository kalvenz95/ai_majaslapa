export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-black gradient-text-green mb-4">404</div>
        <h2 className="text-2xl font-bold text-white mb-3">Lapa nav atrasta</h2>
        <p className="text-gray-400 mb-6">Šī lapa neeksistē.</p>
        <a href="/" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-block">
          Atpakaļ uz sākumu →
        </a>
      </div>
    </div>
  );
}
