
export const  CarousalItem = (props: any) => {
    return (
        <>
            <img src={props.item.img} />
            <h1 className='header'>{props.item.title}</h1>
        </>
    )
}