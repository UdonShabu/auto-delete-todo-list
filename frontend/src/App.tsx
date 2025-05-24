import { useEffect, useRef, useState } from "react";
import "./App.css";
import MainList from "./components/MainList";
import { FOOD_TYPES, type FoodItem, type FoodType } from "./types/food.types";
import ItemColumn from "./components/ItemColumn";

function App() {
  const [foodList, setFoodList] = useState<FoodItem[]>([]);
  const [movedItems, setMovedItems] = useState<Record<FoodType, FoodItem[]>>({
    Fruit: [],
    Vegetable: [],
  });
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const moveToRight = (item: FoodItem) => {
    // console.log("move", movedItems["Fruits"]);
    setFoodList((prev) => prev.filter((food) => food.id !== item.id));
    setMovedItems((prev) => ({
      ...prev,
      [item.type]: [...prev[item.type], item],
    }));
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const withIds = data.map((item: FoodItem) => ({
          ...item,
          id: crypto.randomUUID(),
        }));
        setFoodList(withIds);
      });
    console.log("se");
  }, []);

  return (
    <>
      <div className="flex w-screen h-screen gap-10">
        <MainList items={foodList} onClick={moveToRight} />
        <section className="flex gap-4">
          {FOOD_TYPES.map((type) => (
            <ItemColumn key={type} title={type} items={movedItems[type]} />
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
