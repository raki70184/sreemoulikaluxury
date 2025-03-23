import { Grid } from "@mui/material";
import { IconText } from "../IconText";
import { ServicesList } from "../utils";

export const Services = () => {
  return (
    <>
      {/* <Banner title="Indulge in ultimate pampering with our extensive range of salon services" /> */}
      <Grid
        className="servicesList"
        container
        justifyContent={"space-evenly"}
        alignItems={"baseline"}
        marginTop={10}
        flexDirection={"row"}
      >
        {ServicesList.map((item: any) => {
          return (
            <IconText
              text={item.title}
              key={item.title}
              Icon={item.img}
              isNails={item.nailsEnhancement}
            >
              <ul className="serviceList">
                {item.list.map((itemList: string, index: number) => (
                  <li key={index + "" + itemList}>{itemList}</li>
                ))}
              </ul>

              {item.nailsEnhancement?.length > 0 && (
                <>
                  <hr className="borderSpacing" />
                  <Grid
                    container
                    justifyContent={"space-evenly"}
                    alignItems={"baseline"}
                    flexDirection={"row"}
                  >
                    {item.nailsEnhancement.map((nails: any) => {
                      return (
                        <IconText text={nails.name}>
                          <ul className="serviceList">
                            {nails.list.map(
                              (itemList: string, index: number) => (
                                <li key={index + "" + itemList}>{itemList}</li>
                              )
                            )}
                          </ul>
                        </IconText>
                      );
                    })}
                  </Grid>
                </>
              )}
            </IconText>
          );
        })}
      </Grid>
    </>
  );
};
