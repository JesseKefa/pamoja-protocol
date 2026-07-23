import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        bg-[#081C15]
        text-white
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-20
        "
      >


        <div
          className="
            grid
            gap-16
            lg:grid-cols-4
          "
        >


          {/* BRAND */}

          <div
            className="
              lg:col-span-2
            "
          >

            <h3
              className="
                text-4xl
                font-black
                tracking-tight
              "
            >
              PAMOJA
            </h3>


            <p
              className="
                mt-6
                max-w-md
                text-lg
                leading-8
                text-white/60
              "
            >
              Community-owned financial infrastructure
              helping people save, govern and build
              wealth together.
            </p>


          </div>




          {/* PROTOCOL */}

          <div>

            <h4
              className="
                font-semibold
              "
            >
              Protocol
            </h4>


            <div
              className="
                mt-6
                space-y-4
                text-white/60
              "
            >

              <Link
                href="/communities"
                className="block hover:text-white"
              >
                Communities
              </Link>


              <Link
                href="/create"
                className="block hover:text-white"
              >
                Create Community
              </Link>


              <p>
                Roadmap
              </p>

            </div>

          </div>




          {/* RESOURCES */}

          <div>

            <h4
              className="
                font-semibold
              "
            >
              Resources
            </h4>


            <div
              className="
                mt-6
                space-y-4
                text-white/60
              "
            >

              <p>
                Documentation
              </p>

              <p>
                Developers
              </p>

              <p>
                Contact
              </p>

            </div>

          </div>


        </div>



        {/* BOTTOM */}


        <div
          className="
            mt-20
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-8
            text-sm
            text-white/40
            md:flex-row
            md:justify-between
          "
        >

          <p>
            © 2026 Pamoja Protocol. All rights reserved.
          </p>


          <p>
            Built for communities. Designed for transparency.
          </p>


        </div>


      </div>


    </footer>
  );
}