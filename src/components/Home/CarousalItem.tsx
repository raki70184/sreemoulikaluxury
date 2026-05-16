import { CldImage } from "../CldImage";

export const CarousalItem = (props: { item: { img: string; title: string } }) => {
    return (
        <>
            <CldImage
                publicId={props.item.img}
                alt={props.item.title}
                widths={[480, 640, 960, 1280, 1600]}
                sizes="100vw"
            />
            <h1 className='header'>{props.item.title}</h1>
        </>
    );
};