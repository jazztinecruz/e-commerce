import type { ExtendedCartItem } from "@/core/types/item";
import { Button } from "@nextui-org/react";

type Props = {
  selectedItems: ExtendedCartItem[];
};

const Checkout = ({ selectedItems }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <ul className="mt-4">
        {selectedItems.map(({ item, quantity }, index) => (
          <li key={index} className="flex justify-between py-2">
            <span>
              {item.name} x {quantity}
            </span>
            <span>${(item.price * quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4 pt-4 border-t">
        <span className="font-bold ">Total</span>
        <span className="font-bold text-xl">
          PHP
          {selectedItems
            .reduce(
              (total, { item, quantity }) => total + item.price * quantity,
              0
            )
            .toFixed(2)}
        </span>
      </div>
      <Button color="primary" className="w-full uppercase font-bold">
        Checkout
      </Button>
    </div>
  );
};

export default Checkout;
