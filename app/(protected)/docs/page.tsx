export default function ApiNotesPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          DummyJSON API Notes
        </h2>
        <p className="text-sm text-slate-600">
          This project currently implements features from the Products and Posts
          modules.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-lg font-semibold text-slate-900">Posts</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>GET /posts?limit=12&skip=0</li>
            <li>GET /posts/:id</li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-lg font-semibold text-slate-900">Products</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>GET /products?limit=12&skip=0</li>
            <li>GET /products/:id</li>
          </ul>
        </article>
      </div>

      <p className="text-sm text-slate-600">
        Full reference:
        <a
          href="https://dummyjson.com/docs"
          target="_blank"
          rel="noreferrer"
          className="ml-1 font-medium text-slate-900 underline-offset-4 hover:underline"
        >
          https://dummyjson.com/docs
        </a>
      </p>
    </section>
  );
}
