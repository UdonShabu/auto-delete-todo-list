import type { FoodItem } from "../types/food.types";

type ItemColumnProps = {
  title: string;
  items: FoodItem[];
  onClick: (item: FoodItem) => void;
};
const ItemColumn = ({ title, items, onClick }: ItemColumnProps) => {
  return (
    <div className="xs:w-xs sm:w-sm  max-w-md flex flex-col items-center border border-slate-200 ">
      <h2 className="bg-slate-100 w-full h-10 flex items-center justify-center mb-3 font-bold">
        {title}
      </h2>
      <ul className="space-y-2  w-[92%]">
        {items &&
          items.map((item) => (
            <li key={item.name}>
              <button
                className="btn-primary w-full"
                onClick={() => onClick(item)}
              >
                {item.name}
                {}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ItemColumn;
