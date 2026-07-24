type Props = {
  onClick: () => void;
};

export default function CreateProposalButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-full
        bg-[#1F4D36]
        px-6
        py-3
        font-semibold
        text-white
        transition
        hover:scale-[1.02]
        hover:bg-[#173C2B]
      "
    >
      + Create Proposal
    </button>
  );
}