interface RulerProps {
  onClick: () => void;
}

function Ruler({ onClick }: RulerProps) {
  return (
    <div
      class=" relative w-10 h-80 border-x-transparent border-y flex flex-col justify-between font-extralight text-[10px] lg:hover:scale-105"
      onClick={onClick}
    >
      <div class="flex flex-col justify-between items-center h-full">
        <div class="flex items-center">
          <span class="ml-1">100</span>
        </div>
        <div class="flex items-center">
          <span class="ml-1">75</span>
        </div>
        <div class="flex items-center">
          <span class="ml-1">50</span>
        </div>
        <div class="flex items-center">
          <span class="ml-1">25</span>
        </div>
        <div class="flex items-center">
          <span class="ml-1">0</span>
        </div>
      </div>
    </div>
  );
}

export default Ruler;
