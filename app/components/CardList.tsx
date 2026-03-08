import { INews } from "../utils/types";
import Card from "./Card";

interface IProps {
    list: INews[];
}

export default function CardList({ list }: IProps) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(410px,1fr))] grid-rows-[auto] gap-[30px]">
            {list && list.map((item) => <Card key={item.id} item={item} />)}
        </div>
    );
}
