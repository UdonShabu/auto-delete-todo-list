import { useEffect, useState } from "react";
import type { FoodItem } from "../types/food.types";

const MainList = () => {
  const [items, setItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const withIds = data.map((item: FoodItem) => ({
          ...item,
          id: crypto.randomUUID(),
        }));
        setItems(withIds);
      });
  }, []);
  return (
    <div className="w-screen h-screen ">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <button className="btn-primary w-full">
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
