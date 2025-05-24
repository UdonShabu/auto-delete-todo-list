import type { FoodItem } from "../types/food.types";

type MainListProps = {
  items: FoodItem[];
  onClick: (item: FoodItem) => void;
};
const MainList = ({ items, onClick }: MainListProps) => {
  return (
    <div className=" w-52">
      <ul className="space-y-2">
        {items.map((item) => (
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

export default MainList;
