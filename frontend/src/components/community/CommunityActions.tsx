type Props = {
  onJoin: () => void;
  onContribute: () => void;
};

export default function CommunityActions({
  onJoin,
  onContribute,
}: Props) {
  return (
    <section className="mt-16">

      <div className="flex flex-wrap gap-4">

        <button
          onClick={onJoin}
          className="
            rounded-xl
            bg-[#1F4D36]
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:scale-105
          "
        >
          Join Community
        </button>

        <button
          onClick={onContribute}
          className="
            rounded-xl
            border
            border-slate-300
            bg-white
            px-8
            py-4
            font-semibold
            transition
            hover:bg-slate-100
          "
        >
          Contribute
        </button>

      </div>

    </section>
  );
}