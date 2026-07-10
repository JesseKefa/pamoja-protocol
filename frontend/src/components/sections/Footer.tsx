import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-16 lg:flex-row">

        <div>

          <h3 className="text-3xl font-black text-white">
            PAMOJA
          </h3>

          <p className="mt-4 max-w-sm leading-7">
            Building wealth together through
            transparent community finance.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-10">

          <div>

            <h4 className="font-semibold text-white">
              Platform
            </h4>

            <div className="mt-4 space-y-3">

              <Link href="/communities" className="block">
                Communities
              </Link>

              <Link href="/create" className="block">
                Create
              </Link>

            </div>

          </div>

          <div>

            <h4 className="font-semibold text-white">
              Company
            </h4>

            <div className="mt-4 space-y-3">

              <p>Mission</p>

              <p>Developers</p>

              <p>Contact</p>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}