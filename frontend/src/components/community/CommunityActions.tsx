type Props = {
  isAdmin: boolean;
  isMember: boolean;
  hasPendingRequest: boolean;

  onJoin: () => void;
  onContribute: () => void;
};

export default function CommunityActions({
  isAdmin,
  isMember,
  hasPendingRequest,
  onJoin,
  onContribute,
}: Props) {
  return (
    <section className="mt-16">

      <div className="flex flex-wrap gap-4">

        {/* Visitor */}

        {!isMember && !hasPendingRequest && (
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
        )}

        {/* Pending */}

        {hasPendingRequest && (
          <button
            disabled
            className="
              cursor-not-allowed
              rounded-xl
              bg-amber-100
              px-8
              py-4
              font-semibold
              text-amber-700
            "
          >
            Application Pending
          </button>
        )}

        {/* Members */}

        {isMember && (
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
        )}

        {/* Admin */}

        {isAdmin && (
          <div
            className="
              flex
              items-center
              rounded-xl
              bg-[#F6F8F7]
              px-5
              text-sm
              font-semibold
              text-[#1F4D36]
            "
          >
             You are the community admin
          </div>
        )}

      </div>

    </section>
  );
}