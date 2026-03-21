import { INews } from "../_utils/types";
import Card from "./Card";

interface IProps {
    list: INews[];
}

export default function CardList({ list }: IProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(410px,1fr))] grid-rows-[auto] gap-[30px]">
            {list && list.map((item) => <Card key={item.id} item={item} />)}
        </div>
    );
}
