export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-200 mt-16">
      <div className="w-[92%] max-w-6xl mx-auto py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-black text-white">Swiggy Clone</p>
          <p className="mt-3 text-sm text-gray-400">
            React + Tailwind project with live APIs, reusable components, Redux cart, and routing.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Project Features</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>Restaurant listing and menu explorer</li>
            <li>Dish search and cart management</li>
            <li>Instamart and Dineout experiences</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Tech Stack</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>React</li>
            <li>Tailwind CSS</li>
            <li>Redux Toolkit</li>
            <li>React Router</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Developer</p>
          <p className="mt-3 text-sm text-gray-400">Built as a portfolio-ready frontend project.</p>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="w-[92%] max-w-6xl mx-auto py-4 text-sm text-gray-500">
          (c) {year} Swiggy Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
